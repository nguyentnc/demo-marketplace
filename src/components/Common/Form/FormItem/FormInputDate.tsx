import React, { useEffect } from 'react';
import TextField, { TextFieldProps } from './TextField';
import { InputDate, InputDateProps } from '../UI/InputDate';
import { useFormContext } from 'react-hook-form';

export function FormInputDate({
  inputProps = {},
  ...rest
}: TextFieldProps & {
  inputProps?: Partial<Omit<InputDateProps, 'onChange'>>;
  // inputProps?: Pick<
  // InputDateProps,
  //   'className' | 'selectButtonClassName' | 'disabled' | 'inputSize'
  // >;
}) {
  const { trigger, watch } = useFormContext();
  const watchValue = watch(rest.name);
  useEffect(() => {
    if (watchValue) {
      trigger(rest.name);
    }
  }, [watchValue]);
  return (
    <TextField {...rest}>
      <InputDate {...inputProps} />
    </TextField>
  );
}

export default FormInputDate;
