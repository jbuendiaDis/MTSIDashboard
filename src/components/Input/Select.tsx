import React from 'react';
import { useField } from 'formik';
import { TextField, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Option {
  [key: string]: any;
}

interface SelectProps {
  name: string;
  label: string;
  options: Option[];
  getOptionLabel: (option: Option) => string;
  getOptionValue: (option: Option) => any;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  getOptionLabel,
  getOptionValue,
}) => {
  const [field, meta, helpers] = useField(name);
  const theme = useTheme();

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <TextField
      select
      size="medium"
      label={label}
      variant="outlined"
      fullWidth
      {...field}
      onBlur={handleBlur}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      sx={{
        '& .MuiOutlinedInput-input': {
          padding: theme.spacing(2),
        },
      }}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
