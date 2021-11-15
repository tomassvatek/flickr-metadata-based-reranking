from flask import Flask, request
import json
import dotenv
import os

from data.FlickrClient import FlickrClient
from reranking.rerank_dataset import rerank_dataset

# TODO: Rename appName
app = Flask('test')
dotenv.load_dotenv()


def map_image(flickr_image):
    return {
        'image_name': flickr_image['title'],
        'location': {
            flickr_image['latitude'], flickr_image['longitude']},
        'height': flickr_image['height_z']
    }


@app.route('/images/<searchValue>')
def search_images(searchValue):
    flickr_api_key = os.environ.get('FLICKR_API_KEY')
    client = FlickrClient(flickr_api_key)

    result = client.search_images(search_value=searchValue, per_page=150)

    # TODO: find better way ho to work with JSON
    data = json.loads(json.dumps(result))
    # data is dictionary
    # for photo in data['photos']['photo']:
    #     print(photo['id'])

    images_metada = map(map_image, data['photos']['photo'])
    user_reranking = map(map_image, request.args)
    print(images_metada)
    # rerank_dataset(
    #     reranking_input=user_reranking, images=images_metada)

    # storage = FileStorage()
    # storage.create_file(file_name="flickr-data.json", data=json.dumps(result))
    return result
