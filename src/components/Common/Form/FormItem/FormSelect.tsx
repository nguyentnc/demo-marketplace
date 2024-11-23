import React from 'react';
import TextField, { TextFieldProps } from './TextField';
import Select, { SelectProps } from '../UI/Select';
import { SelectOptionItem } from '@/types/common';

export function FormSelect({
  selectOptions,
  inputProps = {},
  ...rest
}: TextFieldProps & {
  inputProps?: Pick<
    SelectProps,
    | 'className'
    | 'selectButtonClassName'
    | 'disabled'
    | 'inputSize'
    | 'isOnlyValue'
    | 'optionSelectClassname'
    | 'isAllowUncheck'
  >;
  selectOptions: SelectOptionItem[];
}) {
  return (
    <TextField {...rest}>
      {({ value, ...rest }) => (
        <Select
          {...inputProps}
          {...rest}
          value={value as SelectOptionItem | string | number | boolean}
          selectOptions={selectOptions}
        />
      )}
    </TextField>
  );
}

export default FormSelect;
