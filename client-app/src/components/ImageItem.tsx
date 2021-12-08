import { Box } from '@chakra-ui/layout';
import { AspectRatio, Image, Text } from '@chakra-ui/react';
import { ImageItem as Item } from '../types';

type ImageItemProps = {
  rank: number;
  item: Item;
  onItemClick: (item: Item) => void;
};

function ImageItem({ rank, item, onItemClick }: ImageItemProps) {
  let color = 'black';
  switch (rank) {
    case 1:
      color = 'yellow.500';
      break;
    case 2:
      color = 'gray.500';
      break;
    case 3:
      color = 'orange.600';
      break;
  }

  return (
    <Box>
      <AspectRatio
        ratio={4 / 3}
        mr="3"
        cursor="pointer"
        onClick={() => onItemClick(item)}
      >
        <Image
          src={item.metadata.url}
          alt={item.metadata.title}
          objectFit="cover"
          borderRadius="5"
        />
      </AspectRatio>
      <Box mt="2">
        <Text fontSize="sm" color={color} fontWeight="600">
          {rank}. {item.metadata.title} by {item.metadata.owner_name}
        </Text>
        <Text fontSize="xs" color="grey.300">
          Reranking score: {Math.round(item.total_score * 10000) / 10000}
        </Text>
      </Box>
    </Box>
  );
}

export default ImageItem;
