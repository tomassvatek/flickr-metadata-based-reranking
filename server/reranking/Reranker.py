from typing import Iterable
import time
from multiprocessing import Manager, Pool

from reranking.number_distance import number_distance
from reranking.rescale_value import rescale_value
from reranking.edit_distance import levenshtein_distance
from reranking.great_circle_distance import great_circle
from models.ImageMetadata import ImageMetadata, RerankingData


class Reranker:
    def __init__(self, reranking_input: RerankingData, multi_process: bool = None) -> None:
        self.reranking_input = reranking_input
        self.run_multiprocessing = multi_process if multi_process is not None else self.should_run_multiprocessing()
        if self.run_multiprocessing:
            print(f'Running re-ranking on multiple cores.')
            manager = Manager()
            self.items = manager.list()
        else:
            self.items = list()

    def rerank(self, images: Iterable[ImageMetadata]):
        time_now = time.time()

        self.calc_distances(images)

        # convert multiprocessing.Manager proxy list to pure Python list
        pure_items = list(self.items)

        # find min/max value for each re-ranking attribute
        min_values, max_values = dict(), dict()
        for item in pure_items:
            for key in list(item.keys()):
                # ignore descriptive attributes
                if key == 'metadata':
                    continue
                min_values[key] = min(item[key], min_values.get(key, 1000))
                max_values[key] = max(item[key], max_values.get(key, 0))

        reranking_dict = self.reranking_input.__dict__
        for item in pure_items:
            total_score = 0
            for key in list(item.keys()):
                # ignore descriptive attributes
                if key == 'metadata':
                    continue
    
                # scaling distance results to [0, 1] range and then divide re-scaled value by weight
                weight_key = key.replace('distance', 'weight')
                item[key + '_scaled'] = rescale_value(
                    min_values[key], max_values[key], item[key]) / reranking_dict[weight_key]
                total_score += item[key + '_scaled']
            item['total_score'] = total_score

        # sort re-ranking result by total_score
        result = sorted(pure_items, key=lambda item: item['total_score'])
        time_taken = time.time() - time_now
        print(f'Reranking took {time_taken}.')
        return result

    def should_run_multiprocessing(self):
        return True

    def calc_distances(self, images: Iterable[ImageMetadata]):
        if self.run_multiprocessing:
            with Pool() as pool:
                pool.map(self.calc_distance, images)
        else:
            for image in images:
                self.calc_distance(image)

    # for each item's attribute calculate distance based on the attribute
    def calc_distance(self, image: ImageMetadata):
        item = {'metadata': {'image_id': image.image_id,
                             'title': image.title, 'url': image.url,
                             'location': {'lat': image.location.lat, 'lon': image.location.lon},
                             'height': image.height,
                             'owner_name': image.owner_name,
                             'date_taken': image.date_taken
                             }}

        if self.reranking_input.title:
            item['title_distance'] = levenshtein_distance(
                image.title, self.reranking_input.title)

        if self.reranking_input.owner_name:
            item['owner_name_distance'] = levenshtein_distance(
                image.owner_name, self.reranking_input.owner_name)

        if self.reranking_input.location:
            item['location_distance'] = great_circle(
                image.location.lon, image.location.lat,
                self.reranking_input.location.lon, self.reranking_input.location.lat)

        if self.reranking_input.height:
            item['height_distance'] = number_distance(
                image.height, self.reranking_input.height)

        self.items.append(item)
