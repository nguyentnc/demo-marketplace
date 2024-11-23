import React from 'react';
import TextField, { TextFieldProps } from './TextField';
import { Toggle, ToggleProps } from '../UI/Toggle';

export function FormToggle({
  inputProps = {},
  ...rest
}: TextFieldProps & { inputProps?: ToggleProps }) {
  return (
    <TextField {...rest}>
      <Toggle {...inputProps} />
    </TextField>
  );
}

export default FormToggle;
