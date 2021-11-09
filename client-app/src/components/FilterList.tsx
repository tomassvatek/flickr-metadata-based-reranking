import { Box, TextField } from "@mui/material";
import FilterRow from "./FilterRow";

function FilterList() {
  return (
    <Box>
      <FilterRow
        name="Image description"
        placeholder="What are you looking for?"
        control={<TextField variant="outlined" label="Image name" />}
      />
      <FilterRow
        name="Image description"
        placeholder="What are you looking for?"
        control={<TextField variant="outlined" label="Image name" />}
      />
    </Box>
  );
}

export default FilterList;
