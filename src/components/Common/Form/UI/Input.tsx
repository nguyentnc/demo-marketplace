import { PassPropsType } from '@/components/Base/Form';
import { EyeOffLineIcon, EyeOnLineIcon } from '@/components/Icons';
import { TBaseInputProps } from '@/types/ui';
import { InputSize } from '@/utils/constants/ui';
import cn from 'classnames';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> &
  TBaseInputProps &
  PassPropsType<string | number> & {
    classNameWrapper?: string;
    forceUpperCase?: boolean;
    customFormat?: (value: string) => string;
  };

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      classNameWrapper,
      className,
      isError,
      isDirty,
      inputSize = InputSize.MD,
      type,
      value,
      onChange,
      forceUpperCase,
      customFormat,
      ...rest
    },
    ref
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
      if (type !== 'password') {
        return;
      }
      setIsShowPassword((pre) => !pre);
    };

    function preFormatValue(e: ChangeEvent<HTMLInputElement>) {
      let _value = e.target.value;
      if (forceUpperCase) {
        _value = _value.toLocaleUpperCase();
      }
      _value = customFormat ? customFormat(_value) : _value;

      onChange?.(type === 'number' ? Number(_value) : _value);
    }

    return (
      <div className={cn('relative', classNameWrapper)}>
        <input
          {...rest}
          ref={ref}
          value={value}
          onChange={preFormatValue}
          type={isShowPassword ? 'text' : type}
          className={cn(
            `base-input base-input-${inputSize}`,
            {
              error: isError,
            },
            {
              'pr-10': type === 'password',
            },
            className
          )}
        />
        {type === 'password' && value && (
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
            onClick={toggleShowPassword}>
            {isShowPassword ? (
              <EyeOffLineIcon className='h-6 w-6' />
            ) : (
              <EyeOnLineIcon className=' h-6 w-6' />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
