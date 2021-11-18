import { Box, Image } from '@chakra-ui/react';

type MarkerProps = {
  lat: number;
  lng: number;
};

function Marker({ lat, lng }: MarkerProps) {
  return (
    <Box bg="red.400">
      <Image
        src="/marker.svg"
        alt="Segun Adebayo"
        position="absolute"
        top="-45px"
        left="-45px"
        width="60px"
        height="60px"
        transform="scale(0.6, 0.6)"
        filter="contrast(0.815385)"
        transition="0.25s cubic-bezier(0.485, 1.65, 0.545, 0.835) 0s"
        cursor="pointer"
        _hover={{ transform: 'scale(1,1)', filter: 'contrast(1)' }}
      />
    </Box>
  );
}
export default Marker;
