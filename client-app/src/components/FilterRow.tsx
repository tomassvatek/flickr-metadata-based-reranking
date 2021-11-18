import {
  Box,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Slider,
  VStack,
} from '@chakra-ui/react';

type FilterItemProps = {
  name: string;
  control: JSX.Element | React.ReactElement;
};

function FilterRow({ name, control }: FilterItemProps) {
  return (
    <VStack w="100%">
      <Slider defaultValue={1} min={0} max={5} step={1}>
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      {control}
    </VStack>
  );
}

export default FilterRow;
