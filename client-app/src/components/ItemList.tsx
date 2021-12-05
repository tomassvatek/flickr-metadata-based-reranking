import { useDisclosure } from '@chakra-ui/hooks';
import { SimpleGrid } from '@chakra-ui/layout';
import { useState } from 'react';
import { ImageItem as Item } from '../types';
import ImageItem from './ImageItem';
import ImageModal from './ImageModal';

type ItemListProps = {
  items: Item[];
};

function ItemList({ items }: ItemListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<Item>();

  function handleItemClick(item: Item) {
    setSelectedImage(item);
    onOpen();
  }

  return (
    <SimpleGrid columns={5} spacingX="2" spacingY="5">
      {items.map((item, index) => (
        <ImageItem
          key={index}
          rank={index + 1}
          item={item}
          onItemClick={handleItemClick}
        />
      ))}
      <ImageModal item={selectedImage} isOpen={isOpen} onClose={onClose} />
    </SimpleGrid>
  );
}

export default ItemList;
