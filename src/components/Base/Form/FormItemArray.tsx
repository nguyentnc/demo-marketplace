import { ReactNode } from 'react';

import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from 'react-hook-form';

export interface FormItemArrayProps<TFormValues extends FieldValues> {
  name: ArrayPath<TFormValues>;
  keyName?: string;
  children: (props: UseFieldArrayReturn<TFormValues>) => ReactNode;
}

export function FormItemArray<
  TFormValues extends Record<string, any> = Record<string, any>
>({ name, keyName, children }: FormItemArrayProps<TFormValues>) {
  const { control } = useFormContext<TFormValues>();
  const fieldArrayProps = useFieldArray({ control, name, keyName });

  return children(fieldArrayProps);
}
