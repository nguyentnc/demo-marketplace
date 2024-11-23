export enum MappingType {
  TEXT,
  INPUT,
  SELECT,
  RENDER,
}

export interface IFormControlSelectOptions<TValue = string | number | boolean> {
  label: string;
  value: TValue;
  disabled?: boolean;
}

export type TInputRadioValue = string | number | readonly string[] | undefined;
export interface IFormControlGroupRadioOptions<TValue = TInputRadioValue> {
  label: string;
  value: TValue;
  disabled?: boolean;
}

export type TInputCheckboxValue =
  | string
  | number
  | readonly string[]
  | undefined;
export interface IFormControlGroupCheckboxOptions<
  TValue = TInputCheckboxValue
> {
  label: string;
  value: TValue;
  disabled?: boolean;
}

export type TPhoneValue = {
  phoneCode?: string;
  phoneNumber?: string;
};

export type TLoginForm = {
  password: string;
  phoneValue: TPhoneValue;
};

export type TRegisterForm = {
  password: string;
  phoneValue: TPhoneValue;
  otp?: string;
};

export type TForgotPasswordForm = {
  phoneValue: TPhoneValue;
  otp: string;
  newPassword: string;
};
export type TUpdateInfoForm = {
  name: string;
};
