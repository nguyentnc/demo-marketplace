// import { enUS, vi } from 'date-fns/locale';
import { ReactDatePickerProps } from "react-datepicker";

// export const LOCALE_MAPPING = Object.freeze({
//   en: enUS,
//   vi: vi,
// });

export const defaultConfigDatePicker: Partial<ReactDatePickerProps> = {
  showPopperArrow: false,
  popperClassName: "!z-popover !pt-6 w-max ddd",
  dateFormat: "dd/MM/yyyy",
  wrapperClassName: "w-full",
  // locale: LOCALE_MAPPING[language] || enUS,
};

export const configDatePicker: Partial<ReactDatePickerProps> = {
  popperModifiers: [
    {
      name: "offset",
      options: {
        offset: ({ placement, reference, popper }) => {
          if (placement === "bottom-start") {
            return [-50, 0];
          }
          if (placement === "top-start") {
            return [-50, 10];
          }
          if (placement === "bottom-end") {
            return [12, 0];
          }

          if (placement === "top-end") {
            return [12, 10];
          }

          return [0, 0];
        },
      },
    },
  ],
  className:
    "w-[inherit] focus:border-primary focus:outline-none bg-transparent",
};
