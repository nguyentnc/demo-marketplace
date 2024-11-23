import { TDateParam } from "@/types/time";
import dayjs from "dayjs";

export const convertTimeRangeToValue = (from: number, to: number) => {
  // convert hour to minute
  return {
    from: from * 60,
    to: to * 60,
  };
};

export function convertDateToTimeZone(date: TDateParam, tz: string) {
  /*
   * This function force change date to timezone date
   */
  return dayjs(date).tz(tz, true);
}

export function addDay(currentDate: Date | string, numberDay: number) {
  // 7 * 86400 * 1000
  return new Date(new Date(currentDate).getTime() + numberDay * 86400 * 1000);
}

export function convertLocalToUTCDate(date: Date | number | null): Date {
  let result = date;
  if (!result) {
    return new Date();
  }
  result = new Date(result);
  result = new Date(
    Date.UTC(result.getFullYear(), result.getMonth(), result.getDate())
  );
  return result;
}
