from flask import Flask
import json

from core.FlickrClient import FlickrClient
from core.FileStorage import FileStorage

app = Flask('test')


@app.route('/images/<searchValue>')
def search_images(searchValue):
    client = FlickrClient()
    result = client.search_images(search_value=searchValue, per_page=10)

    # TODO: find better way ho to work with JSON
    data = json.loads(json.dumps(result))
    # data is dictionary
    print(data['photos']['photo'][0])
    # storage = FileStorage()
    # storage.create_file(file_name="flickr-data.json", data=json.dumps(result))
    return result
