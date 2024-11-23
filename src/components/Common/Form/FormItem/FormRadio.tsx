import React from 'react';
import TextField, { TextFieldProps } from './TextField';

import Radio, { RadioProps } from '../UI/Radio';
import { TInputRadioValue } from '@/types/form';

export type FormRadioType = TextFieldProps & {
  inputProps?: RadioProps;
  isShowError?: boolean;
  value: TInputRadioValue;
};
export function FormRadio({
  isShowError = true,
  inputProps = {},
  value,
  ...rest
}: FormRadioType) {
  return (
    <TextField
      {...rest}
      isShowError={isShowError}
      labelProps={{
        layout: 'horizontal',
        labelClassName: 'cursor-pointer',
        isReverse: true,
        ...rest.labelProps,
      }}
      value={value}>
      <Radio {...inputProps} />
    </TextField>
  );
}

export default FormRadio;
