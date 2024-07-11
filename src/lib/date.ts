import { format } from 'date-fns';

export const formatToMMDDYYYY = (date: Date) => {
  return format(date, 'MM-dd-yyyy');
};

export const formatToLongLocalizedDate = (date: Date) => {
  return format(date, 'PP');
};

export const formatToMMDDYYYYWithTime = (date: Date) => {
  return format(date, 'Pp');
};
