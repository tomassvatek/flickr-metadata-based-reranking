from dataclasses import dataclass


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
