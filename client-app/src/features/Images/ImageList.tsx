import ItemList from '../../components/ItemList';
import Loading from '../../components/Loading';
import useSearchImage from './useSearchImage';
import { Text } from '@chakra-ui/react';

function ImageList() {
  const { images, loading, error } = useSearchImage();

  if (error) return <Text>{error.message}</Text>;
  if (loading) return <Loading />;

  return <ItemList items={images} />;
}

export default ImageList;
