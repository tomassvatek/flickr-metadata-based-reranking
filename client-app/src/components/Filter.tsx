import {
  Box,
  Button,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from '@chakra-ui/react';
import DatePicker from './DatePicker/DatePicker';
import FilterRow from './FilterRow';
import GeoPicker from './Map/GeoPicker';

function Filter() {
  return (
    <Box py="5">
      <Heading as="h3" size="xl" textAlign="center" pb="5">
        Re-ranking
      </Heading>
      <VStack spacing="5" align="flex-start" mb="8">
        <FilterRow name="Image title" control={<Input placeholder="Title" />} />
        <FilterRow
          name="Image description"
          control={<Input placeholder="Author" />}
        />
        <FilterRow
          name="Date taken"
          control={
            <DatePicker
              placeholderText="Photo taken"
              onChange={(date) => console.log(date)}
            />
          }
        />
        <FilterRow
          name="Image height"
          control={
            <NumberInput
              w="100%"
              placeholder="Image height"
              defaultValue="640"
              min={0}
              max={8000}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          }
        />
      </VStack>

      <Box>
        <Heading as="h3" size="md" textAlign="center" pb="4">
          Choose photo GPS location
        </Heading>
        {/* <Text mr="1rem">Weight:</Text> */}
        <Slider defaultValue={1} min={0} max={5} step={1}>
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <GeoPicker />
      </Box>
      <Button colorScheme="orange" w="100%" mt="5">
        Re-rank
      </Button>
    </Box>
  );
}

export default Filter;
