import { isServer } from "@/utils";
export const NAVBAR_HEIGHT = 86; // h-[86px]: 4rem

export const MAX_OTP_LENGTH = 6;

export const IS_DEV = process.env.NODE_ENV !== "production";

export const BUILD_ID = process.env.CONFIG_BUILD_ID;

export const INTERNAL_API_BASE_URL = isServer
  ? ""
  : `${window.location.origin}/next-api`;

export const LOCAL_STORAGE_KEY = {
  // ACCESS_TOKEN: "td_access_token",
  // REFRESH_TOKEN: "td_refresh_token",
  // TOKEN_TYPE: "td_token_type",
  // ACCESS_TOKEN_ANONYMOUS: "td_access_token_anonymous",
  // REFRESH_TOKEN_ANONYMOUS: "td_refresh_token_anonymous",
  // TESTER_KEY: "td_tester_key",
} as const;

export const BOOLEAN_STATUS = {
  YES: "yes",
  NO: "no",
} as const;

export const defaultPagination = {
  pageLimit: 100,
  pageNumber: 1,
} as const;

export const SORT_ORDERING = {
  DESC: "DESC",
  ASC: "ASC",
} as const;

export enum ECurrency {
  VND = "vnd",
  USD = "usd",
}

type categories = {
  label: string;
  value: number | string;
};

export const BLANK_NAME = "_";

export type TProfileType = {
  id: number;
  name: string;
  link: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const SUPPORT_FILES = [
  "image/jpeg",
  "image/png",
  "image/avif",
  "image/tiff",
  "image/heic",
  "image/heif",
  "image/webp",
  "application/pdf",
];

export const SUPPORT_IMAGES_TYPE = [
  "image/png",
  "image/bmp",
  "image/jpg",
  "image/jpeg",
];

export const IP_COUNTRY_KEY = "cf-ipcountry";
export const IP_COUNTRY_DEFAULT = "VN";

export const ONE_YEAR_TIMESTAMP = 365 * 24 * 60 * 60 * 1000;
export const ONE_DAY_TIMESTAMP = 24 * 60 * 60 * 1000;
