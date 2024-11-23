import React from 'react';
import TextField, { TextFieldProps } from './TextField';
import InputUpload, { InputUploadProps } from '../UI/InputUpload';

export function FormInputUpload({
  inputProps = {},
  ...rest
}: TextFieldProps & { inputProps?: InputUploadProps }) {
  return (
    <TextField {...rest}>
      <InputUpload {...inputProps} />
    </TextField>
  );
}

export default FormInputUpload;
