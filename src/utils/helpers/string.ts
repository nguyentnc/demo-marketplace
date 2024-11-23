/* eslint-disable curly */
/* eslint-disable no-param-reassign */
import qs from "qs";

export const objectToQueryString = (
  params: Record<string, unknown>,
  qsOption?: qs.IStringifyOptions | undefined
) => {
  return qs.stringify(params, qsOption);
};

export const convertDecimal = (value: number, precision = 2) => {
  const rounded =
    Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision);

  return rounded.toString();
};

export const formatAmountToLocale = (
  amount?: number,
  locales?: Intl.LocalesArgument,
  localeOptions?: Intl.NumberFormatOptions
) => {
  if (!amount) {
    return 0;
  }
  return amount.toLocaleString?.(locales, localeOptions);
};

export const formatPhoneNumber = (phoneCode = "", phoneNumber = "") => {
  return `+${phoneCode} ${phoneNumber}`;
};

export const getStopNumTitle = (stopNum: number) => {
  return stopNum - 1 === 0 ? "Bay thẳng" : `${stopNum - 1} chặng dừng`;
};

// This function keeps the casing unchanged for str, then perform the conversion
export function toNonAccentVietnamese(str: string) {
  if (!str) return "";
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export function cleanString(value: string) {
  // eslint-disable-next-line no-control-regex
  return (
    toNonAccentVietnamese(value)
      ?.trim()
      .replace(/[^a-zA-Z0-9 ]/g, "") || ""
  );
}

export function getUserName(
  {
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  },
  options = {
    defaultName: "Name",
    separator: " ",
  }
): string {
  if (!firstName && !lastName) {
    return options.defaultName;
  }

  return [lastName, firstName].join(options.separator).trim();
}
