import { Slider } from "@mui/material";
import { Box } from "@mui/system";

type DataType = "number" | "string" | "date" | "geo";

type FilterItemProps = {
  name: string;
  placeholder: string;
  dataType: DataType;
};

function FilterRow({ name, placeholder }: FilterItemProps) {
  return (
    <Box>
      <Box width={200}>
        <Slider
          aria-label={name}
          defaultValue={1}
          valueLabelDisplay="on"
          marks
          min={0}
          max={5}
        />
      </Box>
    </Box>
  );
}

export default FilterRow;
