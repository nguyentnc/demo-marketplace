'use client';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';
import { Fragment, forwardRef } from 'react';

import { SelectOptionItem } from '@/types/common';

import { PassPropsType } from '@/components/Base/Form';
import { TBaseInputProps } from '@/types/ui';
import { InputSize } from '@/utils/constants/ui';

export type SelectProps = {
  className?: string;
  selectButtonClassName?: string;
  optionSelectClassname?: string;
  selectOptions: SelectOptionItem[];
  disabled?: boolean;
  isOnlyValue?: boolean;
  isAllowUncheck?: boolean;
} & PassPropsType<SelectOptionItem | string | number | boolean> &
  TBaseInputProps;

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      name,
      selectOptions,
      className,
      selectButtonClassName,
      optionSelectClassname,
      disabled,
      isError,
      placeholder,
      value,
      onChange,
      inputSize = InputSize.MD,
      isOnlyValue,
      isAllowUncheck = false,
    },
    ref
  ) => {
    const selectedOptionValue = selectOptions.find(
      (option) =>
        option.value ===
        (isOnlyValue ? value : (value as SelectOptionItem)?.value)
    );

    const selectButtonLabel = selectedOptionValue
      ? selectedOptionValue?.label
      : placeholder;

    return (
      <div className={cn('text-theme-black', className)}>
        <input className='block h-0' name={name} ref={ref} />
        <Listbox
          disabled={!!disabled}
          value={value}
          onChange={(value) => {
            if (!onChange) {
              return;
            }
            if (isAllowUncheck) {
              const currentValue = isOnlyValue
                ? selectedOptionValue?.value
                : selectedOptionValue;
              if (value === currentValue) {
                onChange('');
              } else {
                onChange(value);
              }
            } else {
              onChange(value);
            }
          }}>
          <div className='relative'>
            <Listbox.Button
              className={cn(
                `base-select base-select-${inputSize}`,
                {
                  'bg-theme-black/5 ': disabled,
                  error: isError,
                },
                selectButtonClassName
              )}>
              <span
                className={cn('block  truncate', {
                  '!font-light !text-theme-black/30':
                    !selectedOptionValue?.label,
                })}>
                {selectButtonLabel}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Listbox.Options className='text-bi-sm md:text-bi-base absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {selectOptions.map((selectOptionItem, index) => (
                  <Listbox.Option
                    key={index}
                    disabled={disabled || selectOptionItem.disabled}
                    className={({ active, selected }) =>
                      cn(
                        'relative cursor-pointer select-none text-theme-black',
                        optionSelectClassname,
                        `base-select-${inputSize}`,
                        active ||
                          selectedOptionValue?.value === selectOptionItem.value
                          ? 'bg-primary/5 '
                          : '',
                        // active ? 'bg-primary/20 text-black' : 'text-gray-900',
                        {
                          'bg-common-disabled/20 text-opacity-50':
                            disabled || selectOptionItem.disabled,
                        }
                      )
                    }
                    value={
                      isOnlyValue ? selectOptionItem.value : selectOptionItem
                    }>
                    <div className='flex items-center space-x-2'>
                      <span
                        title={`${selectOptionItem.label}`}
                        className={`block truncate font-normal`}>
                        {selectOptionItem.label}
                      </span>
                      <CheckIcon
                        className={cn(
                          'absolute right-2 top-1/2 h-5 w-5 flex-shrink-0 -translate-y-1/2 text-primary',
                          selectedOptionValue?.value === selectOptionItem.value
                            ? 'visible'
                            : 'invisible'
                        )}
                        aria-hidden='true'
                      />
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    );
  }
);
Select.displayName = 'Select';

export default Select;
