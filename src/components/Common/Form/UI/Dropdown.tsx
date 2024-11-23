'use client';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

import { SelectOptionItem } from '@/types/common';

import { PassPropsType } from '@/components/Base/Form';
import { TBaseInputProps } from '@/types/ui';
import PopoverArrow from '../../Popover';
import SelectItem from '../../Popover/SelectItem';

export type DropdownProps = {
  className?: string;
  selectButtonClassName?: string;
  selectOptions: SelectOptionItem[];
  disabled?: boolean;
  isOnlyValue?: boolean;
} & PassPropsType<SelectOptionItem | string | number | boolean> &
  TBaseInputProps;
// HTMLInputElement, DropdownProps
function DropdownInner(
  {
    name,
    selectOptions,
    className,
    // selectButtonClassName,
    // disabled,
    // isError,
    placeholder,
    value,
    onChange,
    isOnlyValue,
  }: DropdownProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const selectedOptionValue = selectOptions.find(
    (option) =>
      option.value ===
      (isOnlyValue ? value : (value as SelectOptionItem)?.value)
  );

  const selectButtonLabel = selectedOptionValue
    ? selectedOptionValue?.label
    : placeholder;

  return (
    <>
      <PopoverArrow
        className={cn('text-theme-black', className)}
        label={<span className='text-sm'>{selectButtonLabel}</span>}>
        {({ close }) => (
          <div className='w-56 bg-theme-white text-md'>
            {selectOptions.map((selectOptionItem, index) => (
              <SelectItem
                key={index}
                label={selectOptionItem.label}
                isActive={selectedOptionValue?.value === selectOptionItem.value}
                onClick={() => {
                  onChange?.(
                    isOnlyValue ? selectOptionItem.value : selectOptionItem
                  );
                  close();
                }}
              />
            ))}
          </div>
        )}
      </PopoverArrow>
    </>
  );
}

export const Dropdown = forwardRef(DropdownInner);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
