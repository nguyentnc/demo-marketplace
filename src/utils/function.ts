import { isServer } from "@/utils";

import qs from "qs";

import { TDeepLinkQueryParams } from "@/types/common";

import dayjs from "dayjs";

export const getEnv = (key: string): string => {
  if (!key) {
    return "";
  }
  return process.env[key] || "";
};

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const openPopupWindow = (
  url: string,
  w: number,
  h: number,
  windowName = "_blank"
) => {
  if (!isServer) {
    const left = screen.width / 2 - w / 2;
    const top = screen.height / 2 - h / 2;

    const newWindow = window.open(
      url,
      windowName,
      `width=${w},height=${h},top=${top},left=${left}`
    );
    newWindow?.focus();
    return newWindow;
  }
};

export const getLocalStorageData = <T>(key: string): T | null | string => {
  if (!key || isServer) {
    return null;
  }

  const storageData = window.localStorage.getItem(key);
  if (!storageData) {
    return null;
  }

  try {
    const data: T = JSON.parse(storageData);
    return data;
  } catch (error) {
    // console.error(error);
    return storageData ?? null;
  }
};

export const setLocalStorageData = (
  key: string,
  value: any,
  expireTime?: number
) => {
  if (key && !isServer) {
    //expire time should be in 30 minutes
    const data = JSON.stringify({
      data: value,
      expireTime: expireTime ?? dayjs().unix() * 1000 + 1800000,
    });
    window.localStorage.setItem(key, data);
  }
};

export function urltoFile(url: string, filename: string, mimeType: string) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isEmpty = (obj?: any) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

export const isNumeric = (num: any) => {
  return !isNaN(+num);
};

export const isNull = (value: any) => value === null;

export const htmlToPlanText = (data: string) => {
  let resultData = data;
  resultData = resultData.replace(/<style([\s\S]*?)<\/style>/gi, "");
  resultData = resultData.replace(/<script([\s\S]*?)<\/script>/gi, "");
  resultData = resultData.replace(/<\/div>/gi, "\n");
  resultData = resultData.replace(/<\/li>/gi, "\n");
  resultData = resultData.replace(/<li>/gi, "  *  ");
  resultData = resultData.replace(/<\/ul>/gi, "\n");
  resultData = resultData.replace(/<\/p>/gi, "\n");
  resultData = resultData.replace(/<br\s*[\/]?>/gi, "\n");
  resultData = resultData.replace(/<[^>]+>/gi, "");

  return resultData;
};

export const genDeepLink = (params: TDeepLinkQueryParams) => {
  return `/deep-link?${qs.stringify(params)}`;
};

export const openDeepLink = (params: TDeepLinkQueryParams) => {
  window?.open(`${genDeepLink(params)}`, "_blank");
};

export const openDownloadPage = (params: object) => {
  window?.open(`/downloads?${qs.stringify(params)}`, "_blank");
};

export const convertArrayToObject = <T>(
  data: T[],
  key: keyof T
): Record<string, T> => {
  if (!key) {
    return {};
  }

  return data.reduce((result, item) => {
    const keyValue = item[key];

    if (typeof keyValue === "string") {
      return { ...result, [keyValue]: { ...item } };
    }

    return result;
  }, {});
};

export const validatePassword = (password: string) => {
  // const pattern_bk =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-.\/:<=>?@[\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,-.\/:<=>?@[\]^_`{|}~]{8,}$/;

  return password.match(pattern) !== null;
};

export const validatePasswordByCase = (password: string) => {
  const hasCharacter = !!password.match(/^(?=.*[a-zA-Z])/);
  const hasUpperCase = !!password.match(/^(?=.*[A-Z])/);
  const hasNumeric = !!password.match(/^(?=.*\d)/);
  const hasSpecialCharacter = !!password.match(
    /^(?=.*[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/
  );

  return {
    hasCharacter,
    hasUpperCase,
    hasNumeric,
    hasSpecialCharacter,
  };
};

export const validateEmail = (email: string): boolean => {
  return (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null
  );
};

export const validatePhoneWithoutCountryCode = (phone: string): boolean => {
  return phone.match(/^0\d{9}$/) !== null;
};

export const sleep = (second = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, second);
  });
};

export const isNegativeNumber = (num: number) => {
  return Math.sign(num) === -1;
};

export const generateHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

export const randomColor = (length: number): Array<string> => {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(generateHexColor());
  }
  return colors;
};

export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
};

export const parseJSON = <T>(jsonString: string) => {
  try {
    const data: T = JSON.parse(jsonString);
    return data;
  } catch (error) {
    // console.error(error);
    return jsonString;
  }
};

export type TObjectCalcPriceTicket = {
  tickets: number;
  pricePerOne: number;
  fee: number;
  tax: number;
  serviceFee: number;
  discount?: number;
};

export const calculatePrice = (obj: TObjectCalcPriceTicket) => {
  return (
    obj.tickets *
    (obj.pricePerOne + obj.fee + obj.tax + obj.serviceFee - (obj.discount || 0))
  );
};

export function getApiErrorMessages(error: any): string[] {
  let message = "";

  // if (error instanceof Error) {
  //   message = error.message;
  // }
  // if (error instanceof RpcError) {
  //   message = error.message;
  // }
  if ("message" in error) {
    message = error.message;
  }

  if ("error" in error) {
    //
    if (error instanceof Error) {
      message = error.message;
    }
  }

  return [message];
}

export const getCookie = (cname: string) => {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
