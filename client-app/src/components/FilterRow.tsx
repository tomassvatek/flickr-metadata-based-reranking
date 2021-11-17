import {
  Box,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Slider,
} from '@chakra-ui/react';

type DataType = 'number' | 'string' | 'date' | 'geo';

type FilterItemProps = {
  name: string;
  placeholder: string;
  control: JSX.Element | React.ReactElement;
};

function FilterRow({ name, placeholder, control }: FilterItemProps) {
  return (
    <Box display="flex" alignItems="center">
      <Box width={200} display="flex" sx={{ padding: 4 }}>
        <Text mr="1rem">Weight:</Text>
        <Slider defaultValue={1} min={0} max={5} step={1}>
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Box>
      {control}
    </Box>
  );
}

export default FilterRow;
