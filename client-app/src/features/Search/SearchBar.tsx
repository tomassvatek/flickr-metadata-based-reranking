import { Box, Input } from '@chakra-ui/react';
import { useSearch } from './searchAtom';

function SearchBar() {
  const [searchValue, setSearchValue] = useSearch();

  return (
    <Box>
      <Input
        size="lg"
        placeholder="Search image..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {/* <Button
        variant="ghost"
        onClick={() => setSearchValue({ ...searchValue, shouldSearch: true })}
      >
        Search
      </Button> */}
    </Box>
  );
}

export default SearchBar;
