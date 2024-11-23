import '@/libs/styles/react-datepicker.min.css';

import { PassPropsType } from '@/components/Base/Form';
import { CalendarLineIcon } from '@/components/Icons';
import {
  configDatePicker,
  defaultConfigDatePicker,
} from '@/configs/datepicker.config';
import { useMediaQuery } from '@/hooks';
import { TBaseInputProps } from '@/types/ui';
import { InputSize } from '@/utils/constants/ui';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { ForwardedRef, forwardRef } from 'react';
import type { ReactDatePickerProps } from 'react-datepicker';
import { CustomInputDate } from './InputDateFromTo';
// import { CustomInputDate, CustomInputDateLikeText } from './InputDateFromTo';
const ReactDatePicker = dynamic(() => import('react-datepicker'));

export type InputDateProps = TBaseInputProps &
  Omit<PassPropsType<Date>, 'onChange'> &
  Omit<ReactDatePickerProps, 'onChange'> & {
    onChange?: ((event: Date) => void) | undefined;
  };

function InputDateInner(
  {
    // datePickerOptions,
    className,
    isError,
    isDirty,
    inputSize = InputSize.MD,
    value,

    onChange,
    ...rest
  }: InputDateProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const isSmUp = useMediaQuery('sm');

  //* Fix touch on safari portal mode */
  const handleTouchStart = (e: TouchEvent) => e.stopPropagation();
  const handleCalendarOpen = () => {
    document.addEventListener('touchstart', handleTouchStart, true);
    const element =
      document.getElementsByClassName('react-datepicker__day') || [];
    if (
      'focus' in element[0] &&
      typeof element[0].focus === 'function' &&
      !isSmUp
    ) {
      element[0].focus();
    }
  };
  const handleCalendarClose = () =>
    document.removeEventListener('touchstart', handleTouchStart, true);

  return (
    <div
      className={cn(
        `base-input base-input-${inputSize}`,
        'inline-flex items-center focus-within:border-primary focus-within:outline-none',
        {
          error: isError,
          '!focus:border-theme-black/10 !bg-theme-black/5': rest.disabled,
        },
        className
      )}>
      <CalendarLineIcon
        className={cn('mr-2 h-6 w-6 shrink-0 text-theme-black/50')}
      />
      {onChange && (
        <div className='w-full'>
          <ReactDatePicker
            {...defaultConfigDatePicker}
            {...rest}
            placeholderText={rest.placeholder}
            onChange={onChange}
            selected={value}
            // @ts-ignore: wrong propsTypeuy
            ref={(dateRef: any) => {
              (ref as any)?.({
                focus: () => {
                  dateRef?.setFocus();
                  dateRef?.input?.scrollIntoView?.({
                    block: 'center',
                  });
                },
              });
            }}
            customInput={<CustomInputDate forceReadonly={!isSmUp} />}
            withPortal={!isSmUp}
            portalId='calender-portal'
            popperProps={{ strategy: isSmUp ? '' : 'fixed' }}
            calendarContainer={(props) => (
              <div className='bg-theme-white sm:max-w-none'>
                <div className='relative'>{props.children}</div>
              </div>
            )}
            {...configDatePicker}
            onCalendarOpen={handleCalendarOpen}
            onCalendarClose={handleCalendarClose}
          />
        </div>
      )}
    </div>
  );
}
export const InputDate = forwardRef(InputDateInner);
InputDate.displayName = 'InputDate';

export default InputDate;
