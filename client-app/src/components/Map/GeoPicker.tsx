import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';

import Map from './Map';

function GeoPicker() {
  const [latitude, setLatitude] = useState(0);
  const [longtitude, setLongtitude] = useState(0);

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
            value={latitude}
            onChange={(e) => setLatitude(+e.target.value)}
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
            value={longtitude}
            onChange={(e) => setLongtitude(+e.target.value)}
          />
        </InputGroup>
      </HStack>
      <Map
        defaultCenter={{ lat: 10.99835602, lng: 77.01502627 }}
        defaultZoom={11}
        lat={latitude}
        lng={longtitude}
        onClick={(e) => {
          setLatitude(e.lat);
          setLongtitude(e.lng);
        }}
      />
    </Box>
  );
}

export default GeoPicker;
