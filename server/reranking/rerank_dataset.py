from typing import _SpecialForm, Iterable
from reranking.number_distance import number_distance
from reranking.rescale_value import rescale_value
from reranking.edit_distance import levenshtein_distance
from reranking.great_circle_distance import great_circle
from models.ImageMetadata import ImageMetadata, GeoLocation


# for test we just use these attributes: name, GEO, number, heigh_z
def __rerank(reranking_input: ImageMetadata, image: ImageMetadata) -> int:
    image_name_distance = levenshtein_distance(
        image.image_name, reranking_input.image_name)
    image_name_distance_res = rescale_value(
        min=0, max=max(len(image.image_name), len(reranking_input.image_name)), value=image_name_distance)
    print(
        f'Image name distance is: {image_name_distance} and rescale {image_name_distance_res}')

    # geo_distance = great_circle(
    #     image.location.lon, image.location.lat, attr.location.lon, attr.location.lat)
    # geo_distance_res = rescale_value(0, 19840, geo_distance)
    # print(f'Geo distance is {geo_distance} and replace {geo_distance_res}')

    # heigh_distance = number_distance(image.height, attr.height)
    # heigh_distance_res = rescale_value(
    #     0, 1920, heigh_distance)
    # print(
    #     f'Height distance is {heigh_distance} and reslace {heigh_distance_res}')

    return image_name_distance_res  # + geo_distance_res + heigh_distance_res


# def update_min(value, min):
#     return value if value < min else min

def rerank_dataset(reranking_input: ImageMetadata, images: Iterable[ImageMetadata]):
    min_image_name_distance = 1000
    min_location_distance = 1000
    min_height_z_distance = 1000

    max_image_name_distance = 0
    max_location_distance = 0
    max_height_z_distance = 0

    results = []
    for image in images:
        levenshtein_dist = levenshtein_distance(
            image.image_name, reranking_input.image_name)
        min_image_name_distance = min(
            min_image_name_distance, levenshtein_dist)
        max_image_name_distance = max(
            max_image_name_distance, levenshtein_dist)

        great_circle_distance = great_circle(
            image.location.lon, image.location.lat, reranking_input.location.lon, reranking_input.location.lat)
        min_location_distance = min(
            min_location_distance, great_circle_distance)
        max_location_distance = max(
            max_location_distance, great_circle_distance)

        numb_distance = number_distance(image.height, reranking_input.height)
        min_height_z_distance = min(min_height_z_distance, numb_distance)
        max_height_z_distance = max(max_height_z_distance, numb_distance)

        rerank_result = {
            'name': image.image_name,
            'image_name_dist': levenshtein_dist,
            'geo_distance': great_circle_distance,
            'height_distance': numb_distance,
        }

        results.append(rerank_result)

    print(f'Min {min_location_distance}')
    print(f'Max {max_location_distance}')
    for result in results:
        result['image_name_dist_scaled'] = rescale_value(
            min_image_name_distance, max_image_name_distance, result['image_name_dist'])
        result['geo_scaled'] = rescale_value(
            min_location_distance, max_location_distance, result['geo_distance'])

    print(results)
    # print(sorted(results, key=lambda item: item['image_name_dist_scaled']))


def __test_reranking():
    # Prepare data
    # Praha 50.07656000914572, 14.434791191466752
    location = GeoLocation(lat=50.07656000914572, lon=14.434791191466752)
    zahalka_location = GeoLocation(50.01678389039564, 14.40176088182738)

    user_data = ImageMetadata(image_name='Red Fiat',
                              location=zahalka_location, height=490)

    libezniceLocation = GeoLocation(50.181640673048726, 14.465727564020902)
    valatron_location = GeoLocation(50.06216679259851, 14.43770260435632)
    zahalka_location = GeoLocation(50.01678389039564, 14.40176088182738)

    images = [ImageMetadata(image_name='Blue Fiat', location=location, height=700),
              ImageMetadata(image_name='Red Ferrari',
                            location=location, height=700),
              ImageMetadata(image_name='Fiat',
                            location=valatron_location, height=700),
              ImageMetadata(image_name='Re Fiat',
                            location=zahalka_location, height=700),
              ImageMetadata(image_name='Red Fiat',
                            location=libezniceLocation, height=700),
              ImageMetadata(image_name='Naprosta blbost skoda fabia', location=libezniceLocation, height=700)]

    rerank_dataset(user_data, images)

    # # Reranking
    # result = {}
    # for image in images:
    #     result[image.image_name] = rerank(user_data, image)

    # print(result)
