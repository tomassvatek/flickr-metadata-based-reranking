import asyncio
import time
from datetime import date
import json
import jsonpickle
import dotenv
import os
from flask import Flask, request, Response
from flask_cors import CORS

from data.FlickrClient import FlickrClient
from reranking.rerank_dataset import rerank_dataset
from models.ImageMetadata import ImageMetadata, GeoLocation, RerankingData
from data.AsyncFlickrClient import AsyncFlickrClient
from data.FileStorage import FileStorage

# TODO: Rename appName
app = Flask(__name__)
CORS(app)
dotenv.load_dotenv()

START_PAGE = 1
PER_PAGE = 500
MAX_PAGE = 150


def map_image(flickr_image) -> ImageMetadata:
    return ImageMetadata(
        image_id=flickr_image['id'],
        title=flickr_image.get('title'),
        url=flickr_image.get('url_z', ''),
        location=GeoLocation(
            float(flickr_image.get('latitude', 0)), float(flickr_image.get('longitude', 0))),
        height=int(flickr_image.get('height_z', 0)),
        owner_name=flickr_image.get('ownername', ''),
        date_taken=flickr_image.get('datetaken', date.today())
    )


def map_reranking(flickr_image) -> RerankingData:
    return RerankingData(
        image_id=0,
        title=flickr_image['title'] if 'title' in flickr_image and flickr_image['title'] else None,
        url=flickr_image.get('url_z', None),
        location=GeoLocation(
            float(flickr_image['latitude']), float(flickr_image['longitude']) if 'latitude' in flickr_image and 'longitude' in flickr_image else None),
        height=int(flickr_image['height_z']
                   ) if 'height_z' in flickr_image else None,
        owner_name=flickr_image['ownername'] if 'ownername' in flickr_image and flickr_image['ownername'] else None,
        date_taken=flickr_image.get('datetaken', None),

        title_weight=int(flickr_image.get('title_weight', 1)),
        location_weight=int(flickr_image.get('geo_weight', 1)),
        height_weight=int(flickr_image.get('height_z_weight', 1)),
        owner_name_weight=int(flickr_image.get('author_weight', 1)),
        date_taken_weight=int(flickr_image.get('date_taken_weight', 1))
    )


def get_file_name(file_name):
    return file_name.replace(" ", "-").casefold()


@app.route('/images/<searchValue>')
def search_images(searchValue):
    images_metadata = []
    storage = FileStorage()

    time_now = time.time()
    try:
        file_name = f'{get_file_name(searchValue)}.json'
        json_file = storage.load_file(file_name)
        images_metadata = jsonpickle.decode(json_file)
    except:
        print(f'File {file_name} does not exist. Fetching data from Flickr.')

    time_taken = time.time() - time_now
    print(f'Loading file took {time_taken}')

    if images_metadata:
        time_now = time.time()

        user_reranking = map_reranking(request.args)
        reranking_result = rerank_dataset(
            reranking_input=user_reranking, images=images_metadata)

        time_taken = time.time() - time_now
        print(f'Reraniking took {time_taken}')

        reranking_file_name = f'{get_file_name(searchValue + "_result")}.json'
        storage.create_file(reranking_file_name, data=json.dumps(reranking_result))

        return Response(status=200, response=json.dumps(reranking_result[:50]), mimetype='application/json')

    print('Loading')
    time_now = time.time()
    flickr_client = AsyncFlickrClient(os.environ.get('FLICKR_API_KEY'))
    flickr_data = asyncio.run(flickr_client.search_images(
        search_value=searchValue, per_page=PER_PAGE, start_page=START_PAGE, last_page=MAX_PAGE))

    time_taken = time.time() - time_now
    print(time_taken)

    time_reranking = time.time()

    responses_json = json.loads(json.dumps(flickr_data))
    for page in range(START_PAGE, MAX_PAGE):
        data = responses_json[str(page)]
        for item in data['photos']['photo']:
            images_metadata.append(map_image(item))

    # TODO: find better way ho to work with JSON
    # data = json.loads(json.dumps(flickr_data))
    # images_metadata = []
    # for item in data['photos']['photo']:
    #     images_metadata.append(map_image(item))

    user_reranking = map_reranking(request.args)

    reranking_result = rerank_dataset(
        reranking_input=user_reranking, images=images_metadata)

    time_taken_reranking = time.time() - time_reranking
    print(f'{len(images_metadata)} items re-ranked after {time_taken_reranking} s.')

    metadata_file_name = f'{get_file_name(searchValue)}.json'
    # json_string = json.dumps([ob.__dict__ for ob in list_name])
    # object_dict = dict((id(x), x) for x in images_metadata)
    storage.create_file(metadata_file_name,
                        data=jsonpickle.encode(images_metadata))

    reranking_file_name = f'{get_file_name(searchValue + "_result")}.json'
    storage.create_file(reranking_file_name, data=json.dumps(reranking_result))

    return Response(status=200, response=json.dumps(reranking_result[:50]), mimetype='application/json')


@app.route('/images/<searchValue>/pages/<pageId>')
def get_result(searchValue, pageId):
    file_storage = FileStorage()

    file_name = f'{get_file_name(searchValue + "_result")}.json'
    file = file_storage.load_file(file_name)
    data = json.loads(file)

    end = int(pageId) * 50
    start = end - 50
    return Response(status=200, response=json.dumps(data[start:end]), mimetype='application/json')
