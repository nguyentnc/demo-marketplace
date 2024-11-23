import dayjs from 'dayjs';

export type TDateParam =
  | string
  | number
  | Date
  | dayjs.Dayjs
  | null
  | undefined;
