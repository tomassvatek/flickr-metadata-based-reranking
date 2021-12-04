import asyncio
import aiohttp
import time
import urllib.parse


class AsyncFlickrClient:
    def __init__(self, api_key) -> None:
        if len(api_key) == 0:
            raise 'Api key cannot be empty string.'
        self.api_key = api_key

    async def search_images(self, search_value, per_page, start_page, last_page):
        request_count = last_page - start_page
        if request_count > 450:
            raise f'Maximum requests per search is {request_count}.'

        if per_page > 500:
            raise 'Maximum number of images per_page is 500.'

        conn = aiohttp.TCPConnector(limit=None, ttl_dns_cache=300)
        session = aiohttp.ClientSession(connector=conn)
        responses = {}
        urls = [
            f'https://www.flickr.com/services/rest?{urllib.parse.urlencode(self.__get_query_params(search_value, per_page, page))}' for page in range(start_page, last_page)]

        await self.__gather_with_concurrency(request_count, *[self.__get_async(url, session, responses, idx + 1) for idx, url in enumerate(urls)])
        await session.close()
        return responses

    async def __gather_with_concurrency(self, n, *tasks):
        semaphore = asyncio.Semaphore(n)

        async def sem_task(task):
            async with semaphore:
                return await task

        return await asyncio.gather(*(sem_task(task) for task in tasks))

    async def __get_async(self, url, session, results, page_id):
        async with session.get(url) as response:
            response = await response.json()
            results[page_id] = response

    def __get_query_params(self, search_value, per_page=100, page=1):
        return {
            'method': 'flickr.photos.search',
            'text': search_value,
            'per_page': per_page,
            'page': page,
            'api_key': self.api_key,
            'format': 'json',
            'nojsoncallback': '1',
            'has_geo': 'true',
            'extras': 'date_taken,geo,url_z,machine_tags,owner_name'
        }
