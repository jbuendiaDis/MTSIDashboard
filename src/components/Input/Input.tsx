import React, { ReactNode } from 'react';
import { useField } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface FormikTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  name: string;
  label?: ReactNode;
  // showPassword?: boolean;
}

const Input: React.FC<FormikTextFieldProps> = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      // type={showPassword ? 'text' : 'password'}
      error={!!showError}
      helperText={showError ? meta.error : ''}
    />
  );
};

export default Input;
