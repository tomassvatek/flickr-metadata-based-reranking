from dataclasses import dataclass


@dataclass
class GeoLocation:
    lat: float
    lon: float


@dataclass
class ImageMetadata:
    image_name: str
    location: GeoLocation
    height: int
