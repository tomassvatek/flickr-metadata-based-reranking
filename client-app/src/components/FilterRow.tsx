import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";

type DataType = "number" | "string" | "date" | "geo";

type FilterItemProps = {
  name: string;
  placeholder: string;
  control: JSX.Element | React.ReactElement;
};

function FilterRow({ name, placeholder, control }: FilterItemProps) {
  return (
    <Box display="flex" alignItems="center">
      <Box width={200} display="flex" sx={{ padding: 4 }}>
        <Typography variant="body1" marginRight="1rem">
          Weight:
        </Typography>
        <Slider
          aria-label={name}
          defaultValue={1}
          valueLabelDisplay="on"
          marks
          min={0}
          max={5}
        />
      </Box>
      {control}
    </Box>
  );
}

export default FilterRow;
