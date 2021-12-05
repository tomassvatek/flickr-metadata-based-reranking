import {
  AspectRatio,
  Image,
  Box,
  Link,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ImageItem } from '../types';

function formatDistance(distance: number, decimals: number = 10000) {
  return Math.round(distance * decimals) / decimals;
}

type ImageDetailProps = {
  image: ImageItem;
};

function ImageDetail({ image }: ImageDetailProps) {
  return (
    <Box>
      <Link href={image.metadata.url} isExternal>
        <AspectRatio ratio={4 / 3} mr="3">
          <Image
            src={image.metadata.url}
            alt={image.metadata.title}
            objectFit="cover"
            borderRadius="5"
          />
        </AspectRatio>
      </Link>

      <Table variant="simple" mt="5">
        <TableCaption>Re-ranking summary</TableCaption>
        <Thead>
          <Tr>
            <Th>Attribute</Th>
            <Th>Value</Th>
            <Th isNumeric>Distance</Th>
            <Th isNumeric>Scaled distance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {image.title_distance && (
            <Tr>
              <Td>Image title</Td>
              <Td>{image.metadata.title}</Td>
              <Td isNumeric>{image.title_distance} char</Td>
              <Td isNumeric>{formatDistance(image.title_distance_scaled)}</Td>
            </Tr>
          )}
          {image.owner_name_distance && (
            <Tr>
              <Td>Author</Td>
              <Td>{image.metadata.owner_name}</Td>
              <Td isNumeric>{image.owner_name_distance} char</Td>
              <Td isNumeric>
                {formatDistance(image.owner_name_distance_scaled)}
              </Td>
            </Tr>
          )}
          {image.location_distance && (
            <Tr>
              <Td>GPS location</Td>
              <Td>
                {image.metadata.location.lat}, {image.metadata.location.lon}
              </Td>
              <Td isNumeric>
                {formatDistance(image.location_distance, 10)} km
              </Td>
              <Td isNumeric>
                {formatDistance(image.location_distance_scaled)}
              </Td>
            </Tr>
          )}
          {image.height_distance && (
            <Tr>
              <Td>Image height</Td>
              <Td>{image.metadata.height}</Td>
              <Td isNumeric>{image.height_distance}</Td>
              <Td isNumeric>{formatDistance(image.height_distance_scaled)}</Td>
            </Tr>
          )}
          {image.date_taken_distance && (
            <Tr>
              <Td>Date taken</Td>
              <Td>{image.metadata.date_taken}</Td>
              <Td isNumeric>{image.date_taken_distance}</Td>
              <Td isNumeric>
                {formatDistance(image.date_taken_dsitance_scaled)}
              </Td>
            </Tr>
          )}
          <Tr>
            <Td>Image id</Td>
            <Td>{image.metadata.image_id}</Td>
            <Td isNumeric>-</Td>
            <Td isNumeric>-</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

export default ImageDetail;
