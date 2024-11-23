import { extend, tz } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

extend(utc);
extend(timezone);
extend(relativeTime);

export const CURRENT_TIMEZONE = tz.guess();
