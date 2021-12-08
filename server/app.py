import asyncio
import time
import json
import jsonpickle
import dotenv
import os
from flask import Flask, request, Response
from flask_cors import CORS

from data.AsyncFlickrClient import AsyncFlickrClient
from data.FileStorage import FileStorage
from reranking.Reranker import Reranker
from utils import map_reranking, normalize_file_name, map_flickr_responses

# Init Flask
app = Flask(__name__)
CORS(app)
dotenv.load_dotenv()

# Flickr paginator data
FLICKR_START_PAGE = 1
FLICKR_END_PAGE = 150
FLICKR_PER_PAGE = 500

PER_PAGE = 50


def load_data_from_cache(storage, search_value):
    try:
        time_now = time.time()
        file_name = f'{normalize_file_name(search_value)}.json'
        json_file = storage.load_file(file_name)
        time_taken = time.time() - time_now
        print(f'Loading images from storage took {time_taken}.')
        return jsonpickle.decode(json_file)
    except:
        print(f'File {file_name} does not exist. Fetching data from Flickr.')


@app.route('/images/<searchValue>')
def search_images(searchValue):
    storage = FileStorage()
    user_reranking = map_reranking(request.args)
    images_metadata = load_data_from_cache(storage, searchValue)

    # if the images matching the given search value are in the cache
    # then we do not have to query them on Flickr API
    if images_metadata:
        reranker = Reranker(user_reranking)
        reranking_result = reranker.rerank(images_metadata)

        file_name = f'{normalize_file_name(searchValue + "_result")}.json'
        storage.create_file(file_name, json.dumps(reranking_result))
        return Response(status=200, response=json.dumps(reranking_result[:PER_PAGE]), mimetype='application/json')

    time_now = time.time()
    flickr_client = AsyncFlickrClient(os.environ.get('FLICKR_API_KEY'))
    flickr_data = asyncio.run(flickr_client.search_images(
        searchValue, FLICKR_PER_PAGE, FLICKR_START_PAGE, FLICKR_END_PAGE))
    time_taken = time.time() - time_now
    print(f'Loading images from Flickr took {time_taken}.')

    images_metadata = map_flickr_responses(
        flickr_data, FLICKR_START_PAGE, FLICKR_END_PAGE)

    reranker = Reranker(user_reranking)
    reranking_result = reranker.rerank(images_metadata)

    metadata_file_name = f'{normalize_file_name(searchValue)}.json'
    storage.create_file(metadata_file_name, jsonpickle.encode(images_metadata))

    file_name = f'{normalize_file_name(searchValue + "_result")}.json'
    storage.create_file(file_name, data=json.dumps(reranking_result))

    return Response(status=200, response=json.dumps(reranking_result[:PER_PAGE]), mimetype='application/json')


# paging already re-ranked images
@app.route('/images/<searchValue>/pages/<pageId>')
def get_result(searchValue, pageId):
    file_storage = FileStorage()

    file_name = f'{normalize_file_name(searchValue + "_result")}.json'
    file = file_storage.load_file(file_name)
    data = json.loads(file)

    end = int(pageId) * PER_PAGE
    start = end - PER_PAGE
    return Response(status=200, response=json.dumps(data[start:end]), mimetype='application/json')
