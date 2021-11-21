import { Box, HStack } from '@chakra-ui/layout';
import { AspectRatio, Image, Link, Text } from '@chakra-ui/react';
import { ImageItem as Item } from '../types';

type ImageItemProps = {
  item: Item;
};

function ImageItem({ item }: ImageItemProps) {
  return (
    <Box>
      <Link href={item.image_url} isExternal>
        <AspectRatio width="200px" maxW="200px" ratio={4 / 3} mr="3">
          <Image
            src={item.image_url}
            alt={item.image_title}
            objectFit="cover"
            borderRadius="5"
          />
        </AspectRatio>
      </Link>
      <Box mt="2">
        <HStack align="center">
          <Text color="grey.300" fontWeight="600">
            {item.image_title} by John Doe
          </Text>
        </HStack>
        <HStack>
          <Text color="grey.300" fontSize="xs">
            Re-ranking score is {item.reranking_score}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}

export default ImageItem;
