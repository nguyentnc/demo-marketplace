"use client";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { ForwardedRef, Fragment, ReactNode, forwardRef, useState } from "react";

import { PassPropsType } from "@/components/Base/Form";
import { SelectOptionItem } from "@/types/common";
import { TBaseInputProps } from "@/types/ui";
import { InputSize } from "@/utils/constants/ui";
export type ByComparator<T> =
  | (T extends null ? string : keyof T & string)
  | ((a: T, b: T) => boolean);

export type SelectOptionItemCombine =
  | SelectOptionItem<unknown>
  | string
  | number
  | boolean;

export type SelectSearchProps = {
  className?: string;
  // selectButtonClassName?: string;
  inputSearchClassName?: string;
  optionSelectSearchClassName?: string;
  optionGroupSelectSearchClassName?: string;
  selectOptions: SelectOptionItem[];
  compareBy?: ByComparator<SelectOptionItemCombine>;
  disabled?: boolean;
  isOnlyValue?: boolean;
  isRoot?: boolean;
  compareFunc?: (query: string, option: SelectOptionItem) => boolean;
  renderLabel?: (option: SelectOptionItem) => ReactNode;
  displayValue?: (option: SelectOptionItem | undefined) => string;
} & PassPropsType<SelectOptionItemCombine> &
  TBaseInputProps;

const defaultCompare: ByComparator<SelectOptionItemCombine> = (a, b) => {
  if (typeof a === "object" && typeof b === "object") {
    return a.value === b.value;
  }

  // (isOnlyValue ? value : (value as SelectOptionItem)?.value)
  return a === b;
  // return a.name.toLowerCase() === b.name.toLowerCase()
};

function SelectSearchInner(
  {
    name,
    selectOptions,
    compareBy = defaultCompare,
    disabled,
    className,
    inputSearchClassName,
    optionSelectSearchClassName,
    optionGroupSelectSearchClassName,
    isError,
    placeholder,
    value,
    onChange,
    inputSize = InputSize.MD,
    isOnlyValue,
    isRoot = true,
    renderLabel,
    displayValue,
    compareFunc,
  }: SelectSearchProps,
  // }: SelectSearchProps<SelectOptionItem<unknown>[][number]>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [query, setQuery] = useState("");

  const trimQuery = query.trim();

  const filteredSelectOptions =
    trimQuery === ""
      ? selectOptions
      : selectOptions.filter((option) => {
          return typeof compareFunc === "function"
            ? compareFunc(trimQuery, option)
            : option.label.toLowerCase().includes(trimQuery.toLowerCase());
        });

  const selectedOptionValue = selectOptions.find(
    (option) =>
      option.value ===
      (isOnlyValue ? value : (value as SelectOptionItem)?.value)
  );

  const selectInputLabel = selectedOptionValue
    ? selectedOptionValue?.label
    : "";

  return (
    <div className={cn("text-black", className)}>
      <Combobox
        by={compareBy}
        value={value}
        disabled={!!disabled}
        onChange={onChange}
      >
        <div
          className={cn({
            relative: isRoot,
          })}
        >
          <div
            className={cn(
              "base-select relative",
              `base-select-${inputSize}`,
              inputSearchClassName,
              // isError && '!ring-common-error'
              {
                "bg-theme-black/5 ": disabled,
                error: isError,
              }
            )}
          >
            <Combobox.Input
              ref={ref}
              className={
                cn("w-full min-w-[45px] bg-inherit")
                // `base-input base-input-${inputSize}`,
                // {
                //   'bg-[#F2F2F2] ': disabled,
                //   error: isError,
                // }
              }
              displayValue={() =>
                typeof displayValue === "function"
                  ? displayValue(selectedOptionValue)
                  : selectInputLabel || ""
              }
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />

            <Combobox.Button className={cn("absolute inset-y-0 right-0 pr-2")}>
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options
              className={cn(
                "absolute left-0 z-popover mt-1 max-h-60 w-full overflow-auto rounded-xl bg-theme-white text-sm shadow-lg",
                "bg-theme-white shadow-popover-search-flight",
                {
                  "py-2": trimQuery !== "",
                },
                optionGroupSelectSearchClassName
              )}
            >
              {filteredSelectOptions.length === 0 && trimQuery !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredSelectOptions.map((option, idx) => (
                  <Combobox.Option
                    key={idx}
                    value={isOnlyValue ? option.value : option}
                    disabled={option.disabled}
                    className={({ active, selected }) =>
                      cn(
                        "relative cursor-pointer select-none space-x-2 px-3 text-theme-black",
                        active || selected ? "bg-primary/5 " : "",
                        // 'relative flex cursor-pointer select-none items-center space-x-2 px-4 py-2',
                        optionSelectSearchClassName,
                        // active || selected
                        //   ? 'bg-primary/20 text-black'
                        //   : 'text-gray-900',
                        option.disabled &&
                          "!cursor-not-allowed bg-common-disabled/20 text-opacity-50"
                      )
                    }
                  >
                    <div className="flex items-center space-x-2 border-b border-theme-black/20 py-3 pr-10">
                      {typeof renderLabel === "function" ? (
                        renderLabel(option)
                      ) : (
                        <span
                          title={`${option.label}`}
                          className={`block truncate font-normal`}
                        >
                          {option.label}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          "absolute right-2 top-1/2 h-5 w-5 flex-shrink-0 -translate-y-1/2 text-primary",
                          selectedOptionValue?.value === option.value
                            ? "visible"
                            : "invisible"
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
export const SelectSearch = forwardRef(SelectSearchInner);
SelectSearch.displayName = "SelectSearch";

export default SelectSearch;
