import React from 'react';
import TextField, { TextFieldProps } from './TextField';
import Input, { InputProps } from '../UI/Input';

export function FormInput({
  inputProps = {},
  ...rest
}: TextFieldProps & { inputProps?: InputProps }) {
  return (
    <TextField {...rest}>
      <Input {...inputProps} />
    </TextField>
  );
}

export default FormInput;
