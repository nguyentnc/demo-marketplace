// base-input base-input-sm base-input-md base-input-lg
// base-input-otp base-input-otp-sm base-input-otp-md base-input-otp-lg
// base-select base-select-sm base-select-md base-select-lg
// base-select-flight-sm base-select-flight-md base-select-flight-lg

export const InputSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

export const InputSizeStyle = {
  [InputSize.SM]: 'py-2 pl-4 pr-2',
  [InputSize.MD]: 'py-3 pl-3 pr-2',
  [InputSize.LG]: 'py-4 pl-4 pr-3',
} as const;
