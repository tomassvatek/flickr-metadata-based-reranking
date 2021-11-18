import { SimpleGrid } from '@chakra-ui/layout';
import { ImageItem as Item } from '../types';
import ImageItem from './ImageItem';

type ItemListProps = {
  items: Item[];
};

function ItemList({ items }: ItemListProps) {
  return (
    <SimpleGrid columns={5} spacingX="2" spacingY="5">
      {items.map((item) => (
        <ImageItem item={item} />
      ))}
    </SimpleGrid>
  );
}

export default ItemList;
