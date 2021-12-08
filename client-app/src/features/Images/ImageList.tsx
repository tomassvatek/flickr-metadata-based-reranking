import ItemList from '../../components/ItemList';
import { Box, Button, Center, Spinner, Text } from '@chakra-ui/react';
import { ImageItem } from '../../types';

type ImageListProps = {
  images: ImageItem[];
  loading: boolean;
  error: Error | undefined;
  onLoadMore: () => void;
};

function ImageList({ images, loading, error, onLoadMore }: ImageListProps) {
  if (error)
    return (
      <Center>
        <Text>{error.message}</Text>
      </Center>
    );

  if (loading)
    return (
      <Center>
        <Spinner size="xl" color="tomato.300" />
      </Center>
    );

  if (images.length === 0)
    return (
      <Center>
        <Text fontSize="2xl">Just search some images...</Text>
      </Center>
    );

  return (
    <Box>
      <ItemList items={images} />
      <Center py="5">
        <Button bg="red.300" color="white" px="20" onClick={onLoadMore}>
          {'Load more'.toUpperCase()}
        </Button>
      </Center>
    </Box>
  );
}

export default ImageList;
