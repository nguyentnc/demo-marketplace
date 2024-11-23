import React from 'react';
import TextField, { TextFieldProps } from './TextField';
import cn from 'classnames';
import Checkbox, { CheckboxProps } from '../UI/Checkbox';

export type FormCheckboxType = TextFieldProps & { inputProps?: CheckboxProps };
export function FormCheckbox({
  inputProps = {},
  className,
  ...rest
}: FormCheckboxType) {
  return (
    <TextField
      labelProps={{
        layout: 'horizontal',
        // className: 'flex-row-reverse',
        labelClassName: cn(
          'cursor-pointer whitespace-normal flex-1 !text-neutral-black',
          className
        ),
        isReverse: true,
        ...rest.labelProps,
      }}
      {...rest}>
      <Checkbox {...inputProps} />
    </TextField>
  );
}

export default FormCheckbox;
