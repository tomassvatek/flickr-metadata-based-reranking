import { Box, Flex } from '@chakra-ui/layout';
import { AspectRatio, Image, Text } from '@chakra-ui/react';
import { ImageItem as Item } from '../types';

type ImageItemProps = {
  item: Item;
};

function ImageItem({ item }: ImageItemProps) {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text>Image distance</Text>
        <Text>{item.image_title}</Text>
        <Text>{item.image_name_dist}</Text>
        <Text>{item.image_title_scaled}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>GEO distance</Text>
        <Text>{item.geo_distance} km</Text>
        <Text>{item.geo_scaled}</Text>
      </Flex>
      <AspectRatio maxW="400px" ratio={4 / 3}>
        <Image src={item.image_url} alt={item.image_title} objectFit="cover" />
      </AspectRatio>
    </Box>
  );
}

export default ImageItem;
