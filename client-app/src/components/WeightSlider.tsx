import { Box } from '@chakra-ui/react';
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
}

const WeightSlider = <T extends FieldValues>({
  name,
  control,
}: WeightSliderProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Slider id={name} min={0} max={5} step={1} {...field}>
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        );
      }}
    />
  );
};

export default WeightSlider;
