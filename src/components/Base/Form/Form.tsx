'use client';
import cn from 'classnames';
import { ReactNode } from 'react';
import { DevTool } from '@hookform/devtools';

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
  methods: UseFormReturn<TFormValues>;
  className?: string;
  debug?: boolean;
};

export function Form<
  TFormValues extends Record<string, any> = Record<string, any>
>({ children, onSubmit, methods, className, debug }: FormProps<TFormValues>) {
  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn(className)}>
        {children}
      </form>
      {debug && (
        <DevTool
          placement='bottom-left'
          control={methods.control}
          styles={{
            panel: {
              zIndex: 99999,
              height: 'calc(100vh - 100px)',
            },
          }}
        />
      )}
    </FormProvider>
  );
}

export default Form;
