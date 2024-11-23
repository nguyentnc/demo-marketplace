import "@/libs/styles/react-datepicker.min.css";
import cn from "classnames";
import ReactDatePicker, {
  CalendarContainerProps,
  ReactDatePickerProps,
} from "react-datepicker";

import { PassPropsType } from "@/components/Base/Form";
import SelectItem from "@/components/Common/Popover/SelectItem";
import { CalendarLineIcon } from "@/components/Icons";
import {
  configDatePicker,
  defaultConfigDatePicker,
} from "@/configs/datepicker.config";
import { useMediaQuery } from "@/hooks";
import { TBaseInputProps } from "@/types/ui";
import { InputSize } from "@/utils/constants/ui";
import { addDay } from "@/utils/helpers";
import {
  DetailedHTMLProps,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import "./calender.css";

export type TFromToDate = {
  startDate?: Date | null;
  endDate?: Date | null;
};
export type InputDateFromToProps = {
  placeholderStart?: string;
  placeholderEnd?: string;
  showFilter?: boolean;
  listOptionFilter?: TOptionFilter[];
} & TBaseInputProps &
  PassPropsType<TFromToDate> &
  Omit<ReactDatePickerProps, "onChange">;

export const CustomInputDate = forwardRef(
  (
    {
      value,
      forceReadonly,
      ...rest
    }: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > & { forceReadonly?: boolean },
    ref: ForwardedRef<HTMLInputElement>
  ) => <input {...rest} value={value} ref={ref} readOnly={forceReadonly} />
);

CustomInputDate.displayName = "CustomInputDate";

export type TOptionFilter = {
  period: {
    from: number;
    to: number;
  };
  label: string;
};

type TCalendarContainerWithFilter = CalendarContainerProps & {
  showFilter?: boolean;
  optionList: TOptionFilter[];
  activeOption?: TOptionFilter;
  handleChangeOption: (data: TOptionFilter) => void;
};
const ONE_DAY = 24 * 60 * 60 * 1000;

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const numberOfDaysInCurrentMonth = new Date(
  currentYear,
  currentMonth + 1,
  0
).getDate();

const DEFAULT_OPTION_FILTER: TOptionFilter[] = [
  {
    period: {
      from: Date.now() - 90 * ONE_DAY,
      to: Date.now(),
    },
    label: "90 Ngày trước",
  },
  {
    period: {
      from: new Date().setFullYear(currentYear, currentMonth, 1),
      to: new Date().setFullYear(
        currentYear,
        currentMonth,
        numberOfDaysInCurrentMonth
      ),
    },
    label: "Tháng này",
  },
  {
    period: {
      from: new Date().setFullYear(currentYear, 0, 1),
      to: new Date().setFullYear(currentYear, 11, 31),
    },
    label: "Năm nay",
  },
  {
    period: {
      from: -1,
      to: -1,
    },
    label: "Tùy chỉnh ngày",
  },
];

function CalendarContainerWithFilter({
  className,
  children,
  showFilter,
  optionList,
  activeOption,
  handleChangeOption,
}: TCalendarContainerWithFilter) {
  return (
    <div className={cn("filter-calender sm:max-w-none", className)}>
      {showFilter && (
        <div>
          <div className="w-[170px] bg-theme-white text-md">
            {optionList.map((selectOptionItem, index) => (
              <SelectItem
                className="!p-3"
                key={index}
                label={selectOptionItem.label}
                isActive={
                  activeOption &&
                  activeOption.period.from === selectOptionItem.period.from &&
                  activeOption.period.to === selectOptionItem.period.to
                }
                onClick={() => handleChangeOption(selectOptionItem)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

function InputDateFromToInner(
  {
    // datePickerOptions,

    name,
    className,
    isError,
    isDirty,
    inputSize = InputSize.MD,
    value,
    onChange,
    placeholderStart = "Ngày đi",
    placeholderEnd = "Ngày về",
    showFilter,
    listOptionFilter,
    ...rest
  }: InputDateFromToProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const isSmUp = useMediaQuery("sm");

  const [activeOptionFilter, setActiveOptionFilter] = useState<TOptionFilter>();
  const handleChangeOptionFilter = (option: TOptionFilter) => {
    setActiveOptionFilter(option);
    if (option.period.from === -1 && option.period.to === -1) {
      onChange && onChange({ startDate: new Date() });
      return;
    }
    const newDurationdate: TFromToDate = {
      endDate: new Date(option.period.to),
      startDate: new Date(option.period.from),
    };
    onChange && onChange(newDurationdate);
  };
  const handleChangeValueStartDate = (date: Date | null) => {
    if (
      showFilter &&
      activeOptionFilter?.period.from !== -1 &&
      activeOptionFilter?.period.to !== -1
    ) {
      setActiveOptionFilter(
        DEFAULT_OPTION_FILTER[DEFAULT_OPTION_FILTER.length - 1]
      );
    }
    const newDate: TFromToDate = {
      startDate: date,
      endDate: value?.endDate,
    };
    if (date && value?.endDate && new Date(date) >= new Date(value.endDate)) {
      newDate.endDate = new Date(addDay(date, 7));
    }
    onChange?.(newDate);
  };
  const handleChangeValueEndDate = (date: Date | null) => {
    if (
      showFilter &&
      activeOptionFilter?.period.from !== -1 &&
      activeOptionFilter?.period.to !== -1
    ) {
      setActiveOptionFilter(
        DEFAULT_OPTION_FILTER[DEFAULT_OPTION_FILTER.length - 1]
      );
    }
    onChange?.({
      startDate: value?.startDate,
      endDate: date,
    });
  };

  //* Fix touch on safari portal mode */
  const handleTouchStart = (e: TouchEvent) => e.stopPropagation();
  const handleCalendarOpen = () => {
    document.addEventListener("touchstart", handleTouchStart, true);
    const element =
      document.getElementsByClassName("react-datepicker__day") || [];
    if (
      "focus" in element[0] &&
      typeof element[0].focus === "function" &&
      !isSmUp
    ) {
      element[0].focus();
    }
  };
  const handleCalendarClose = () =>
    document.removeEventListener("touchstart", handleTouchStart, true);

  return (
    <div
      className={cn(
        `base-input base-input-${inputSize}`,
        "inline-flex items-center focus-within:border-primary focus-within:outline-none",
        {
          error: isError,
        },
        className
      )}
    >
      <CalendarLineIcon
        className={cn("mr-2 h-6 w-6 shrink-0 text-theme-black/50")}
      />
      <div className="flex w-full items-center divide-x">
        <div className="w-[calc(100%_-_56px)]">
          <ReactDatePicker
            calendarContainer={(props) => (
              <CalendarContainerWithFilter
                {...props}
                showFilter={showFilter}
                activeOption={activeOptionFilter}
                handleChangeOption={handleChangeOptionFilter}
                optionList={listOptionFilter || DEFAULT_OPTION_FILTER}
              />
            )}
            monthsShown={2}
            {...defaultConfigDatePicker}
            {...rest}
            name={`${name}.startDate`}
            minDate={rest.minDate}
            placeholderText={placeholderStart}
            onChange={handleChangeValueStartDate}
            selected={value?.startDate}
            startDate={value?.startDate}
            endDate={value?.endDate}
            customInput={<CustomInputDate forceReadonly={!isSmUp} />}
            // ref={(dateRef: any) => {
            //   (ref as any)?.({
            //     focus: () => {
            //       dateRef?.setFocus();
            //       dateRef?.input?.scrollIntoView?.({
            //         block: 'center',
            //       });
            //     },
            //   });
            // }}
            withPortal={!isSmUp}
            portalId="calender-portal"
            {...configDatePicker}
            selectsStart
            onCalendarOpen={handleCalendarOpen}
            onCalendarClose={handleCalendarClose}
          />
        </div>
        <div className="w-full">
          <ReactDatePicker
            calendarContainer={(props) => (
              <CalendarContainerWithFilter
                {...props}
                showFilter={showFilter}
                activeOption={activeOptionFilter}
                handleChangeOption={handleChangeOptionFilter}
                optionList={listOptionFilter || DEFAULT_OPTION_FILTER}
              />
            )}
            monthsShown={2}
            {...defaultConfigDatePicker}
            {...rest}
            name={`${name}.endDate`}
            placeholderText={placeholderEnd}
            onChange={handleChangeValueEndDate}
            selected={value?.endDate}
            startDate={value?.startDate}
            endDate={value?.endDate}
            // minDate={addDay(value?.startDate || new Date(), 1)}
            minDate={value?.startDate || new Date()}
            selectsEnd
            customInput={<CustomInputDate forceReadonly={!isSmUp} />}
            withPortal={!isSmUp}
            portalId="calender-portal"
            {...configDatePicker}
            className={cn(configDatePicker.className, "pl-4")}
            onCalendarOpen={handleCalendarOpen}
            onCalendarClose={handleCalendarClose}
          />
        </div>
      </div>
    </div>
  );
}
export const InputDateFromTo = forwardRef(InputDateFromToInner);
InputDateFromTo.displayName = "InputDateFromTo";

export default InputDateFromTo;
