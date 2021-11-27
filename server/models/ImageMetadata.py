from dataclasses import dataclass
from datetime import datetime


@dataclass
class GeoLocation:
    lat: float
    lon: float


@dataclass
class ImageMetadata:
    title: str
    url: str
    location: GeoLocation
    height: int
    owner_name: str
    date_taken: datetime


@dataclass
class RerankingData(ImageMetadata):
    title_weight: int
    location_weight: int
    height_weight: int
    owner_name_weight: int
    date_taken_weight: int
