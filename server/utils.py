import json
from datetime import date

from models.ImageMetadata import ImageMetadata, GeoLocation, RerankingData


def map_flickr_responses(data, start_page, end_page):
    images_metadata = []
    responses_json = json.loads(json.dumps(data))
    for page in range(start_page, end_page):
        data = responses_json[str(page)]
        for item in data['photos']['photo']:
            images_metadata.append(map_image(item))
    return images_metadata


def map_image(flickr_image) -> ImageMetadata:
    return ImageMetadata(
        image_id=flickr_image['id'],
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
        image_id=0,
        title=flickr_image['title'] if 'title' in flickr_image and flickr_image['title'] else None,
        url=flickr_image.get('url_z', None),
        location=GeoLocation(
            float(flickr_image['latitude']), float(flickr_image['longitude']) if 'latitude' in flickr_image and 'longitude' in flickr_image else None),
        height=int(flickr_image['height_z']
                   ) if 'height_z' in flickr_image and isinstance(flickr_image['height_z'], int) else None,
        owner_name=flickr_image['ownername'] if 'ownername' in flickr_image and flickr_image['ownername'] else None,
        date_taken=flickr_image.get('datetaken', None),

        title_weight=int(flickr_image.get('title_weight', 1)),
        location_weight=int(flickr_image.get('geo_weight', 1)),
        height_weight=int(flickr_image.get('height_z_weight', 1)),
        owner_name_weight=int(flickr_image.get('author_weight', 1)),
        date_taken_weight=int(flickr_image.get('date_taken_weight', 1))
    )


def normalize_file_name(file_name):
    return file_name.replace(" ", "-").casefold()
