// AutoCompleteField.tsx

import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useField, FieldAttributes } from 'formik';

interface AutoCompleteFieldProps extends FieldAttributes<any> {
  label: string;
  options: Record<string, unknown>[];
  labelField: string;
  onSelected?: (value?: any) => void;
}

const AutoCompleteComponent: React.FC<AutoCompleteFieldProps> = ({
  label,
  options,
  labelField,
  onSelected,
  ...props
}) => {
  const { name, ...restProps } = props;
  const [field, meta, helpers] = useField({ name, ...restProps });

  const handleChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: Record<string, unknown> | Record<string, unknown>[] | null
  ) => {
    helpers.setValue(value);

    if (onSelected) {
      onSelected(value);
    }
  };

  return (
    <Autocomplete
      {...field}
      options={options}
      getOptionLabel={(option) =>
        option ? (option[labelField] as string) : ''
      }
      onChange={handleChange}
      value={field.value || null}
      renderInput={(params) => (
        <div style={{ position: 'relative' }}>
          <TextField
            {...params}
            label={label}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        </div>
      )}
    />
  );
};

export { AutoCompleteComponent };
