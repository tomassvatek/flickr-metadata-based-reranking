import requests


class FlickrClient:
    api_key = ''

    def __init__(self, api_key) -> None:
        self.api_key = api_key

    def search_images(self, search_value, per_page):
        query_params = self.__build_query_params(search_value, per_page)

        response = requests.get(
            'https://www.flickr.com/services/rest/', params=query_params)

        response.raise_for_status()

        if response.status_code != 204:
            data = response.json()
        return data

    def __build_query_params(self, search_value, per_page=100):
        # TODO: Handle empty api_key
        return {
            'method': 'flickr.photos.search',
            'text': search_value,
            'per_page': per_page,
            'api_key': self.api_key,
            'format': 'json',
            'nojsoncallback': '1',
            'has_geo': 'true',
            'extras': 'date_taken,geo,url_z,machine_tags'
        }