import { ErrorMessage } from '@hookform/error-message';
import cn from 'classnames';
import React from 'react';

type Props = {
  errors: any;
  name: string;
  className?: string;
};

export default function FormErrorMessage({ errors, name, className }: Props) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className={cn('text-common-error', className)}>{message}</p>
      )}
    />
  );
}
