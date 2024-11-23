import React from 'react';
import TextField, { TextFieldProps } from './TextField';
import InputRange, { InputRangeProps } from '../UI/InputRange';

export function FormInputRange({
  inputProps = {},
  ...rest
}: TextFieldProps & { inputProps?: InputRangeProps }) {
  return (
    <TextField {...rest}>
      <InputRange {...inputProps} />
    </TextField>
  );
}

export default FormInputRange;
