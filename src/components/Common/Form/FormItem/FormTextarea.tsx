import React from 'react';
import TextField, { TextFieldProps } from './TextField';

import Textarea, { TextareaProps } from '../UI/Textarea';

export function FormTextarea({
  inputProps = {},
  ...rest
}: TextFieldProps & { inputProps?: TextareaProps }) {
  return (
    <TextField {...rest}>
      <Textarea {...inputProps} />
    </TextField>
  );
}

export default FormTextarea;
