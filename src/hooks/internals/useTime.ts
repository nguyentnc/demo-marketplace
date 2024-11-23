import dayjs from "dayjs";
import enLocale from "dayjs/locale/en";
import viLocale from "dayjs/locale/vi";

import { TDateParam } from "@/types/time";
import { useMemo } from "react";
import { useAppLanguage } from "./useAppLanguage";

export const FORMAT_TIME = "HH:mm";

export const FORMAT_DATE_TIME = "DD/MM/YYYY HH:mm";

export const FORMAT_TIME_DATE = "HH:mm - DD/MM/YYYY ";

export const FORMAT_DATE = "DD/MM/YYYY";

// export const FORMAT_DAY_MONTH = 'ddd, DD/MM';
export const FORMAT_DAY_MONTH = "ddd, DD [thg] MM";

export const FORMAT_DAY_MONTH_YEAR = "ddd, DD/MM/YYYY";

export const FORMAT_SORT_DATE = "MM-DD-YYYY";

export const FORMAT_ARTICLE_TIME = "ddd, D MMM YYYY";

export const FORMAT_TIME_DAY_MONTH_YEAR = "HH:mm:ss, DD/MM/YYYY";

export const LOCALE_MAPPING = Object.freeze({
  en: enLocale,
  vi: viLocale,
});

function formatDateJs(formatString = FORMAT_DATE, locale = enLocale) {
  return (date: TDateParam) => {
    if (dayjs(date).isValid()) {
      return dayjs(date).locale(locale).format(formatString);
    }
    return "";
  };
}

export function useTime() {
  const { language } = useAppLanguage();

  const currentLocale = useMemo(
    () => LOCALE_MAPPING[language as keyof typeof LOCALE_MAPPING] || enLocale,
    [language]
  );

  function formatDateCustom(formatString: string) {
    return formatDateJs(formatString, currentLocale);
  }

  function formatDateGMT7(date: TDateParam) {
    return formatDateJs(
      FORMAT_DATE,
      currentLocale
    )(dayjs(date).tz("Asia/Bangkok", false));
  }

  function formatDateUTC(date: TDateParam) {
    return formatDateJs(FORMAT_DATE, currentLocale)(dayjs(date).utc(false));
  }

  function formatDateUTCOnlyTime(date: TDateParam) {
    return formatDateJs(FORMAT_TIME, currentLocale)(dayjs(date).utc(false));
  }

  function formatDateUTCDayMonthYear(date: TDateParam) {
    return formatDateJs(
      FORMAT_DAY_MONTH_YEAR,
      currentLocale
    )(dayjs(date).utc(false));
  }

  function formatDateUTCDayMonth(date: TDateParam) {
    return formatDateJs(
      FORMAT_DAY_MONTH,
      currentLocale
    )(dayjs(date).utc(false));
  }

  function formatDateTimeGMT7(date: TDateParam) {
    return formatDateJs(
      FORMAT_DATE_TIME,
      currentLocale
    )(dayjs(date).tz("Asia/Bangkok", false));
  }

  return {
    formatDate: formatDateJs(FORMAT_DATE, currentLocale),
    formatDateTime: formatDateJs(FORMAT_DATE_TIME, currentLocale),
    formatTimeDate: formatDateJs(FORMAT_TIME_DATE, currentLocale),
    formatOnlyTime: formatDateJs(FORMAT_TIME, currentLocale),
    formatTimeDuration: formatDateJs(FORMAT_TIME, currentLocale),
    formatSortDate: formatDateJs(FORMAT_SORT_DATE, currentLocale),
    formatDayMonth: formatDateJs(FORMAT_DAY_MONTH, currentLocale),
    formatDayMonthYear: formatDateJs(FORMAT_DAY_MONTH_YEAR, currentLocale),
    formatTimeDayMonthYear: formatDateJs(
      FORMAT_TIME_DAY_MONTH_YEAR,
      currentLocale
    ),
    formatDateGMT7,
    formatDateTimeGMT7,
    formatDateCustom,
    formatDateUTC,
    formatDateUTCOnlyTime,
    formatDateUTCDayMonth,
    formatDateUTCDayMonthYear,
  };
}
