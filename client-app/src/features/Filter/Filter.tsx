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
import DatePicker from '../../components/DatePicker/DatePicker';
import FilterRow from '../../components/FilterRow';
import GeoPicker from '../../components/Map/GeoPicker';
import { useFilter } from './filterAtom';

function Filter() {
  const [filter, setFilter] = useFilter();

  // const handleChangeInput = useCallback((event: React.ChangeEvent) => {

  //   // setFilter();
  // }, []);

  return (
    <Box py="5">
      <Heading as="h3" size="xl" textAlign="center" pb="5">
        Re-ranking
      </Heading>
      <VStack spacing="5" align="flex-start" mb="8">
        <FilterRow
          name="Image title"
          control={
            <Input
              placeholder="Title"
              value={filter.title}
              onChange={(e) => setFilter({ ...filter, title: e.target.value })}
            />
          }
        />
        <FilterRow
          name="Author"
          control={<Input placeholder="Author" value={filter.author} />}
        />
        <FilterRow
          name="Date taken"
          control={
            <DatePicker
              placeholderText="Photo taken"
              selected={filter.photo_date}
              onChange={(date: any) => {
                setFilter({ ...filter, photo_date: date as Date });
              }}
            />
          }
        />
        <FilterRow
          name="Image height"
          control={
            <NumberInput
              w="100%"
              placeholder="Image height"
              value={filter.height_z}
              onChange={(e) => setFilter({ ...filter, height_z: +e })}
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
        <GeoPicker
          lat={filter.latitude}
          lng={filter.longitude}
          onChange={(lat, lng) => {
            setFilter({ ...filter, latitude: lat, longitude: lng });
          }}
        />
      </Box>
      <Button colorScheme="orange" w="100%" mt="5">
        Re-rank
      </Button>
    </Box>
  );
}

export default Filter;
