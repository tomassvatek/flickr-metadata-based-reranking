import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Heading, VStack } from '@chakra-ui/layout';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/number-input';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from '../../components/DatePicker/DatePicker';
import GeoPicker from '../../components/Map/GeoPicker';
import WeightSlider from '../../components/WeightSlider';
import { FilterValues } from './filterAtom';

type RerankingFormProps = {
  onSubmit: (values: FilterValues) => void;
};

// Dejvice square
const defaultLocation = {
  lat: 50.10064046898848,
  lng: 14.395575076827498,
};

function RerankingForm({ onSubmit }: RerankingFormProps) {
  const [position, setPosition] = useState(defaultLocation);
  const [dateTaken, setDateTaken] = useState(new Date());

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
  } = useForm<FilterValues>({
    defaultValues: {
      title: '',
      ownername: '',
      datetaken: new Date(),
      height_z: 0,
      geo_weight: 1,
      title_weight: 1,
      author_weight: 1,
      height_z_weight: 1,
      date_taken_weight: 1,
    },
  });

  function handleSubmitForm(values: FilterValues) {
    onSubmit({
      ...values,
      latitude: position.lat,
      longitude: position.lng,
      datetaken: dateTaken,
    });
  }

  return (
    <Box py="5" pt="90px">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {/* <Heading as="h3" size="lg" textAlign="center" pb="5">
          Re-ranking
        </Heading> */}
        <VStack spacing="5" align="flex-start" mb="8">
          <Box w="100%">
            <Heading as="h3" size="sm" textAlign="center" pb="4">
              Image title
            </Heading>
            <WeightSlider name="title_weight" control={control} />
            <Input
              id="title"
              placeholder="Image title"
              {...register('title')}
            />
          </Box>

          <Box w="100%">
            <Heading as="h3" size="sm" textAlign="center" pb="4">
              Author fullname
            </Heading>
            <WeightSlider name="author_weight" control={control} />
            <Input
              id="author"
              placeholder="Author fullname"
              {...register('ownername')}
            />
          </Box>

          <Box w="100%">
            <Heading as="h3" size="sm" textAlign="center" pb="4">
              Date taken
            </Heading>
            <WeightSlider name="date_taken_weight" control={control} />
            <DatePicker
              name="photo_date"
              placeholderText="Photo taken"
              selected={dateTaken}
              dateFormat="dd.MM.yyyy"
              onChange={(e) => setDateTaken(e as Date)}
            />
          </Box>

          <Box w="100%">
            <Heading as="h3" size="sm" textAlign="center" pb="4">
              Image height
            </Heading>
            <WeightSlider name="height_z_weight" control={control} />
            <Controller
              name="height_z"
              control={control}
              render={({ field }) => {
                return (
                  <NumberInput
                    w="100%"
                    placeholder="Image height"
                    min={0}
                    max={8000}
                    {...field}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                );
              }}
            />
          </Box>

          <Box>
            <Heading as="h3" size="sm" textAlign="center" pb="4">
              Photo GPS location
            </Heading>
            <WeightSlider name="geo_weight" control={control} />
            <GeoPicker
              lat={position.lat}
              lng={position.lng}
              onChange={(lat, lng) => setPosition({ lat, lng })}
            />
          </Box>

          <Button
            mt={4}
            w="100%"
            colorScheme="orange"
            isLoading={isSubmitting}
            type="submit"
          >
            {'Search & Rerank'.toUpperCase()}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default RerankingForm;
