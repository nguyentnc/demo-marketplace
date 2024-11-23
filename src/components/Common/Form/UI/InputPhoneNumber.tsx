import cn from 'classnames';

import { PassPropsType } from '@/components/Base/Form';
import { TBaseInputProps } from '@/types/ui';
import { InputSize } from '@/utils/constants/ui';
import { ForwardedRef, forwardRef } from 'react';

import { SelectOptionItem } from '@/types/common';
import Input, { InputProps } from './Input';
import SelectSearch, { SelectSearchProps } from './SelectSearch';
import { TPhoneValue } from '@/types/form';

export type InputPhoneNumberProps = {
  className?: string;
  placeholderCode?: string;
  placeholderPhone?: string;

  phoneNumberProps?: InputProps;
  phoneCodeProps?: Pick<
    SelectSearchProps,
    | 'className'
    | 'disabled'
    | 'inputSize'
    | 'inputSearchClassName'
    | 'optionSelectSearchClassName'
  >;
  phoneCodeOptions: SelectOptionItem[];
} & TBaseInputProps &
  Omit<PassPropsType<TPhoneValue>, 'placeholder'>;

function InputPhoneNumberInner(
  {
    phoneNumberProps,
    phoneCodeProps,
    name,
    className,
    isError,
    isDirty,
    inputSize = InputSize.MD,
    value,
    onChange,
    placeholderCode = '+84',
    placeholderPhone = '',
    phoneCodeOptions,
  }: // ...rest
  InputPhoneNumberProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={cn(
        `base-input relative base-input-${inputSize}`,
        'inline-flex items-center focus-within:border-primary focus-within:outline-none',
        {
          error: isError,
          'bg-theme-black/5':
            phoneNumberProps?.disabled && phoneCodeProps?.disabled,
        },
        className
      )}>
      <div className='flex w-full items-center'>
        <div className='inline-flex '>
          <SelectSearch
            {...phoneCodeProps}
            inputSize={inputSize}
            selectOptions={phoneCodeOptions}
            name={`${name}.phoneCode`}
            isOnlyValue
            isRoot={false}
            placeholder={placeholderCode}
            onChange={(_value: any) => {
              onChange?.({
                phoneNumber: value?.phoneNumber,
                phoneCode: _value,
              });
            }}
            value={value?.phoneCode}
            inputSearchClassName={cn(
              phoneCodeProps?.className,
              'border-none inline-flex max-w-[80px] !pl-0 !py-0 !pr-6',
              {
                '!bg-transparent': phoneCodeProps?.disabled,
              }
            )}
            optionGroupSelectSearchClassName='top-full mt-1'
            renderLabel={(option) => (
              <span
                title={`${option.label}`}
                className={`block truncate font-normal text-theme-black`}>
                {option.label}{' '}
                <span className='text-theme-black/50'>
                  ({option.displayValue as string})
                </span>
              </span>
            )}
            displayValue={(value) => (value?.displayValue as string) || ''}
            compareFunc={(trimQuery, option) => {
              return (
                option.label.toLowerCase().includes(trimQuery.toLowerCase()) ||
                (option.value as string)
                  .toLowerCase()
                  .includes(trimQuery.toLowerCase())
              );
            }}
          />
        </div>
        <div className='grow '>
          <Input
            {...phoneNumberProps}
            inputSize={inputSize}
            ref={ref}
            name={`${name}.phoneNumber`}
            onChange={(_value) => {
              onChange?.({
                phoneCode: value?.phoneCode,
                phoneNumber: _value?.toString().replace(/[^0-9]/g, ''),
              });
            }}
            value={value?.phoneNumber}
            className={cn(
              phoneNumberProps?.className,
              ' border-none py-0 pl-0',
              {
                '!bg-transparent': phoneNumberProps?.disabled,
              }
            )}
            placeholder={placeholderPhone}
            type='text'
            minLength={4}
            maxLength={13}
          />
        </div>
      </div>
    </div>
  );
}
export const InputPhoneNumber = forwardRef(InputPhoneNumberInner);
InputPhoneNumber.displayName = 'InputPhoneNumber';

export default InputPhoneNumber;
