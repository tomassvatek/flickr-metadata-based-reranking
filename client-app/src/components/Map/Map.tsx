import { Box } from '@chakra-ui/layout';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

type MapProps = GoogleMapReact.Props & {
  lat: number;
  lng: number;
};

function Map({ defaultCenter, defaultZoom, lat, lng, ...props }: MapProps) {
  const apiKey = process.env.GOOGLE_API_KEY as string;

  return (
    <Box h="450" w="100%">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        {...props}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </Box>
  );
}

export default Map;
