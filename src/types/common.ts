import { BOOLEAN_STATUS } from "@/utils/constants/general";
import { AxiosResponse } from "axios";

export interface CustomAxiosResponse<T = unknown, D = unknown> {
  originResponse: AxiosResponse<T, D>;
  data?: T;
  error?: unknown;
}

export const SCREEN_BREAK_POINT = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;

export const SCREEN_BREAK_POINT_VALUE = {
  [SCREEN_BREAK_POINT.XS]: "376px",
  [SCREEN_BREAK_POINT.SM]: "640px",
  // [SCREEN_BREAK_POINT.MD]: '768px',
  [SCREEN_BREAK_POINT.MD]: "960px",
  [SCREEN_BREAK_POINT.LG]: "1280px",
  [SCREEN_BREAK_POINT.XL]: "1440px",
} as const;

export type TScreenBreakpoint = ValueOf<typeof SCREEN_BREAK_POINT>;

export interface PagingParams {
  page?: number;
  perPage?: number;
}

export type TStatus = "active" | "deactivate";

export type TDeepLinkQueryParams = {
  redirectLink: string;
};

export interface SelectOptionItem<TValue = string | number | boolean> {
  value: TValue;
  label: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface IRangeInput {
  min: number;
  max: number;
}

export interface IBreadcrumb {
  title?: string;
  keyTranslate?: string;
  path: string;
}

export type TBooleanStatus =
  (typeof BOOLEAN_STATUS)[keyof typeof BOOLEAN_STATUS];

export interface SortParams {
  sortBy?: string;
  sortType?: "ASC" | "DESC";
}
