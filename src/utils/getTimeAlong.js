// utils/getTimeAlong.js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

export const getTimeAlong = (updatedAt, locale = 'vi') => {
  dayjs.locale(locale);
  return dayjs(updatedAt).fromNow();
};
