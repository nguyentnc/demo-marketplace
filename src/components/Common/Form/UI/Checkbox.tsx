import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

export type CheckboxProps = {
  isError?: boolean;
  isDirty?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, isError, isDirty, ...rest }, ref) => (
    <input
      {...rest}
      ref={ref}
      type='checkbox'
      className={cn(
        'form-checkbox cursor-pointer rounded-md text-primary',
        'focus:ring-0 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-theme-gray-200',
        'placeholder:font-light placeholder:not-italic placeholder:text-theme-black/30 ',
        isError && 'border-common-error focus:border-common-error',
        className
      )}
    />
  )
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
