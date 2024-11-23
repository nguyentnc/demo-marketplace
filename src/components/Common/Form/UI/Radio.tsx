import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

export type RadioProps = {
  isError?: boolean;
  isDirty?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, isError, isDirty, ...rest }, ref) => (
    <input
      {...rest}
      ref={ref}
      type='radio'
      className={cn(
        'form-radio flex-shrink-0 cursor-pointer rounded-full font-normal text-primary',
        'focus:ring-0 focus:ring-offset-0',
        'disabled:bg-bi-gray-100 disabled:cursor-not-allowed disabled:text-theme-gray-200',
        'placeholder:font-light placeholder:not-italic placeholder:text-theme-black/30 ',
        isError && 'border-common-error focus:border-common-error',
        className
      )}
    />
  )
);
Radio.displayName = 'Radio';

export default Radio;
