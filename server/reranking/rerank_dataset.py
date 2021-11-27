from typing import Iterable
from reranking.number_distance import number_distance
from reranking.rescale_value import rescale_value
from reranking.edit_distance import levenshtein_distance
from reranking.great_circle_distance import great_circle
from models.ImageMetadata import ImageMetadata, RerankingData


def rerank(reranking_input: RerankingData, images: Iterable[ImageMetadata]):
    min_value = {
        'title': 1000,
        'owner_name': 1000,
        'location': 1000,
        'height': 1000,
        'date_taken': 1000
    }

    max_value = {
        'title': 0,
        'owner_name': 0,
        'location': 0,
        'height': 0,
        'date_taken': 0
    }

    items = []
    for image in images:
        # add description attributes
        item = {'image_title': image.title, 'image_url': image.url,
                'image_owner_name': image.owner_name}

        if reranking_input.title:
            item['title'] = levenshtein_distance(
                image.title, reranking_input.title)
            min_value['title'] = min(min_value['title'], item['title'])
            max_value['title'] = max(max_value['title'], item['title'])

        if reranking_input.owner_name:
            item['owner_name'] = levenshtein_distance(
                image.owner_name, reranking_input.owner_name)
            min_value['owner_name'] = min(
                min_value['owner_name'], item['owner_name'])
            max_value['owner_name'] = max(
                max_value['owner_name'], item['owner_name'])

        if reranking_input.location:
            item['location'] = great_circle(
                image.location.lon, image.location.lat, reranking_input.location.lon, reranking_input.location.lat)
            min_value['location'] = min(
                min_value['location'], item['location'])
            max_value['location'] = max(
                max_value['location'], item['location'])

        if reranking_input.height:
            item['height'] = number_distance(
                image.height, reranking_input.height)
            min_value['height'] = min(min_value['height'], item['height'])
            max_value['height'] = max(max_value['height'], item['height'])

        items.append(item)
    return (items, min_value, max_value)


def rerank_dataset(reranking_input: ImageMetadata, images: Iterable[ImageMetadata]):
    (items, min_value, max_value) = rerank(reranking_input, images)

    reranking_dict = reranking_input.__dict__
    for item in items:
        total_score = 0
        for key in list(item.keys()):
            # ignore description attributes
            if key == 'image_title' or key == 'image_url' or key == 'image_owner_name':
                continue

            item[key + '_scaled'] = rescale_value(
                min_value[key], max_value[key], item[key]) / reranking_dict[key + '_weight']
            total_score += item[key + '_scaled']
        item['total_score'] = total_score

    return sorted(items, key=lambda item: item['total_score'])


# def __test_reranking():
#     # Prepare data
#     # Praha 50.07656000914572, 14.434791191466752
#     location = GeoLocation(lat=50.07656000914572, lon=14.434791191466752)
#     zahalka_location = GeoLocation(50.01678389039564, 14.40176088182738)

#     user_data = ImageMetadata(image_name='Red Fiat',
#                               location=zahalka_location, height=490)

#     libezniceLocation = GeoLocation(50.181640673048726, 14.465727564020902)
#     valatron_location = GeoLocation(50.06216679259851, 14.43770260435632)
#     zahalka_location = GeoLocation(50.01678389039564, 14.40176088182738)

#     images = [ImageMetadata(image_name='Blue Fiat', location=location, height=700),
#               ImageMetadata(image_name='Red Ferrari',
#                             location=location, height=700),
#               ImageMetadata(image_name='Fiat',
#                             location=valatron_location, height=700),
#               ImageMetadata(image_name='Re Fiat',
#                             location=zahalka_location, height=700),
#               ImageMetadata(image_name='Red Fiat',
#                             location=libezniceLocation, height=700),
#               ImageMetadata(image_name='Naprosta blbost skoda fabia', location=libezniceLocation, height=700)]

#     rerank_dataset(user_data, images)

    # # Reranking
    # result = {}
    # for image in images:
    #     result[image.image_name] = rerank(user_data, image)

    # print(result)
