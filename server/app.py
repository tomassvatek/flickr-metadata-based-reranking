import json
import dotenv
import os
from flask import Flask, request, jsonify

from data.FlickrClient import FlickrClient
from reranking.rerank_dataset import rerank_dataset
from models.ImageMetadata import ImageMetadata, GeoLocation

# TODO: Rename appName
app = Flask('test')
dotenv.load_dotenv()


def map_image(flickr_image) -> ImageMetadata:
    return ImageMetadata(
        title=flickr_image['title'],
        url=flickr_image.get('url_z', ''),
        location=GeoLocation(
            float(flickr_image['latitude']), float(flickr_image['longitude'])),
        height=int(flickr_image['height_z'])
    )


@app.route('/images/<searchValue>')
def search_images(searchValue):
    flickr_api_key = os.environ.get('FLICKR_API_KEY')
    client = FlickrClient(flickr_api_key)
    flickr_data = client.search_images(search_value=searchValue, per_page=150)

    # TODO: find better way ho to work with JSON
    data = json.loads(json.dumps(flickr_data))
    # data is dictionary
    # for photo in data['photos']['photo']:
    #     print(photo['id'])

    images_metadata = []  # dict(map_image, data['photos']['photo'])
    for item in data['photos']['photo']:
        images_metadata.append(map_image(item))

    user_reranking = map_image(request.args)
    # print(images_metada)
    print('ok')
    result = rerank_dataset(
        reranking_input=user_reranking, images=images_metadata)
    print(result)

    # storage = FileStorage()
    # storage.create_file(file_name="flickr-data.json", data=json.dumps(result))
    return json.dumps(result)
