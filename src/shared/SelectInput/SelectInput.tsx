import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  name?: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
  style?: React.CSSProperties;
}

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
  anchorOrigin: {
    vertical: "bottom" as "bottom",
    horizontal: "left" as "left",
  },
  transformOrigin: {
    vertical: "top" as "top",
    horizontal: "left" as "left",
  },
};

const SelectInput: React.FC<SelectInputProps> = ({
  label = "",
  name = "",
  value = "",
  onChange,
  options,
  style,
}) => {
  return (
    <FormControl margin="normal" style={style}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        MenuProps={menuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
