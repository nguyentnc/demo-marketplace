import { TBaseInputProps } from '@/types/ui';
import { InputSize } from '@/utils/constants/ui';
import cn from 'classnames';
import { TextareaHTMLAttributes, forwardRef } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TBaseInputProps;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, inputSize = InputSize.MD, isDirty, ...rest }, ref) => (
    <textarea
      {...rest}
      ref={ref}
      className={cn(
        `base-input base-input-${inputSize}`,
        {
          error: isError,
        },
        className
      )}
    />
  )
);
Textarea.displayName = 'Textarea';

export default Textarea;
