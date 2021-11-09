from flask import Flask
import json
from dotenv import load_dotenv
import os

from core.FlickrClient import FlickrClient
from core.FileStorage import FileStorage

app = Flask('test')
load_dotenv()


@app.route('/images/<searchValue>')
def search_images(searchValue):
    flickr_api_key = os.environ.get('FLICKR_API_KEY')
    client = FlickrClient(flickr_api_key)
    result = client.search_images(search_value=searchValue, per_page=10)

    # TODO: find better way ho to work with JSON
    data = json.loads(json.dumps(result))
    # data is dictionary
    print(data['photos']['photo'][0])
    # storage = FileStorage()
    # storage.create_file(file_name="flickr-data.json", data=json.dumps(result))
    return result
