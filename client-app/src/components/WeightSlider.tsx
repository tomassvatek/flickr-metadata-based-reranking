import { Box, Text } from '@chakra-ui/react';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

interface WeightSliderProps<T> {
  name: FieldPath<T>;
  control: Control<T, object>;
  minValue?: number;
  maxValue?: number;
  step?: number;
}

const WeightSlider = <T extends FieldValues>({
  name,
  control,
  minValue = 1,
  maxValue = 5,
  step = 1,
}: WeightSliderProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Slider
            id={name}
            min={minValue}
            max={maxValue}
            step={step}
            {...field}
          >
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color="tomato">
                <Text>{field.value}</Text>
              </Box>
            </SliderThumb>
          </Slider>
        );
      }}
    />
  );
};

export default WeightSlider;
