import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { ImageItem } from '../types';
import ImageDetail from './ImageDetail';

type ImageModalProps = {
  item: ImageItem | undefined;
  isOpen: boolean;
  onClose: () => void;
};

function ImageModal({ item, isOpen, onClose }: ImageModalProps) {
  return (
    <Box>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item?.metadata.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{item && <ImageDetail image={item} />}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ImageModal;
