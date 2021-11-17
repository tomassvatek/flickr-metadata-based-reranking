import { Box, Input } from '@chakra-ui/react';
import FilterRow from './FilterRow';

function FilterList() {
  return (
    <Box>
      <FilterRow
        name="Image description"
        placeholder="What are you looking for?"
        control={<Input placeholder="Basic usage" />}
      />
      <FilterRow
        name="Image description"
        placeholder="What are you looking for?"
        control={<Input placeholder="Basic usage" />}
      />
    </Box>
  );
}

export default FilterList;
