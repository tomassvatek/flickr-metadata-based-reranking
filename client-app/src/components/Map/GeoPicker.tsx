import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import Map from './Map';

type GeoPickerProps = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
};

function GeoPicker({ lat, lng, onChange: onPositionChange }: GeoPickerProps) {
  return (
    <Box>
      <HStack spacing="4" pb="3">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1em"
            children="lat:"
          />
          <Input
            placeholder="Longitude"
            value={lat}
            onChange={(e) => onPositionChange(+e.target.value, lng)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1em"
            children="lng:"
          />
          <Input
            placeholder="Longitude"
            value={lng}
            onChange={(e) => onPositionChange(lat, +e.target.value)}
          />
        </InputGroup>
      </HStack>
      <Map
        defaultCenter={{ lat: 10.99835602, lng: 77.01502627 }}
        defaultZoom={11}
        lat={lat}
        lng={lng}
        onClick={(e) => {
          onPositionChange(e.lat, e.lng);
        }}
      />
    </Box>
  );
}

export default GeoPicker;
