import cn from 'classnames';
import React, { LabelHTMLAttributes, PropsWithChildren } from 'react';

export type LabelInputProps = {
  label: string | JSX.Element;
  className?: string;
  labelClassName?: string;
  isReverse?: boolean;
  isRequired?: boolean;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  layout?: 'horizontal' | 'vertical';
};

export default function LabelInput({
  label,
  children,
  isRequired,
  className,
  labelClassName,
  labelProps,
  layout = 'vertical',
  isReverse,
}: PropsWithChildren<LabelInputProps>) {
  return (
    <div
      className={cn('flex', className, {
        'flex-col space-y-2': layout === 'vertical',
        'flex-row items-center space-x-2': layout === 'horizontal',
      })}>
      {isReverse && children}
      <label
        {...labelProps}
        className={cn(
          'flex-shrink-0 text-neutral-50 ',
          labelClassName,
          isRequired && 'required-field'
        )}>
        {label}
      </label>
      {!isReverse && children}
    </div>
  );
}
