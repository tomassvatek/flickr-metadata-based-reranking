import { Box } from '@chakra-ui/layout';
import { ImageItem as Item } from '../types';
import ImageItem from './ImageItem';

type ItemListProps = {
  items: Item[];
};

function ItemList({ items }: ItemListProps) {
  return (
    <Box>
      {items.map((item) => (
        <ImageItem item={item} />
      ))}
    </Box>
  );
}

export default ItemList;
