export type ImageItem = {
  title_distance: number;
  title_distance_scaled: number;

  owner_name_distance: number;
  owner_name_distance_scaled: number;

  location_distance: number;
  location_distance_scaled: number;

  height_distance: number;
  height_distance_scaled: number;

  date_taken_distance: number;
  date_taken_dsitance_scaled: number;

  metadata: ImageMetadata;
  total_score: number;
};

type ImageMetadata = {
  image_id: number;
  title: string;
  owner_name: string;
  url: string;
  date_taken: Date;
  height: number;
  location: Geolocation;
};

type Geolocation = {
  lat: number;
  lon: number;
};
