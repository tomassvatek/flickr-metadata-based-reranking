from datetime import date
import json
import dotenv
import os
from flask import Flask, request, Response
from flask_cors import CORS

from data.FlickrClient import FlickrClient
from reranking.rerank_dataset import rerank_dataset
from models.ImageMetadata import ImageMetadata, GeoLocation, RerankingData

# TODO: Rename appName
app = Flask(__name__)
CORS(app)
dotenv.load_dotenv()


def map_image(flickr_image) -> ImageMetadata:
    return ImageMetadata(
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


@app.route('/images/<searchValue>')
def search_images(searchValue):
    flickr_api_key = os.environ.get('FLICKR_API_KEY')
    client = FlickrClient(flickr_api_key)
    flickr_data = client.search_images(search_value=searchValue, per_page=150)

    # TODO: find better way ho to work with JSON
    data = json.loads(json.dumps(flickr_data))
    images_metadata = []  # dict(map_image, data['photos']['photo'])
    for item in data['photos']['photo']:
        images_metadata.append(map_image(item))

    user_reranking = map_reranking(request.args)
    # print(images_metada)
    result = rerank_dataset(
        reranking_input=user_reranking, images=images_metadata)
    # storage = FileStorage()
    # storage.create_file(file_name="flickr-data.json", data=json.dumps(result))
    return Response(status=200, response=json.dumps(result), mimetype='application/json')
