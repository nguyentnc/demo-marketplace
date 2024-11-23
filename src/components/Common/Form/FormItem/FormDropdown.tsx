import React from 'react';
import TextField, { TextFieldProps } from './TextField';
import Dropdown, { DropdownProps } from '../UI/Dropdown';
import { SelectOptionItem } from '@/types/common';

export function FormDropdown({
  selectOptions,
  inputProps = {},
  ...rest
}: TextFieldProps & {
  inputProps?: Pick<
    DropdownProps,
    | 'className'
    | 'selectButtonClassName'
    | 'disabled'
    | 'inputSize'
    | 'isOnlyValue'
  >;
  selectOptions: SelectOptionItem[];
}) {
  return (
    <TextField {...rest}>
      {({ value, ...rest }) => (
        <Dropdown
          {...inputProps}
          {...rest}
          value={value as SelectOptionItem}
          selectOptions={selectOptions}
        />
      )}
    </TextField>
  );
}

export default FormDropdown;
