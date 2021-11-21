import ItemList from '../../components/ItemList';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { ImageItem } from '../../types';

type ImageListProps = {
  images: ImageItem[];
  loading: boolean;
  error: Error | undefined;
};

function ImageList({ images, loading, error }: ImageListProps) {
  // const { images, loading, error } = useSearchImage();

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

  return <ItemList items={images} />;
}

export default ImageList;
