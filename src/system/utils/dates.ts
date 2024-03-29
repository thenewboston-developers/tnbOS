export const currentSystemDate = (): string => {
  return systemDate(new Date());
};

export const epochDate = (): string => {
  return systemDate(new Date(0));
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

export const longDate = (date: number | string | Date): string => {
  const customDate = new Date(date);
  const dateStr = customDate.toLocaleDateString(undefined, {dateStyle: 'long'});
  const timeStr = customDate.toLocaleTimeString(undefined, {timeStyle: 'long'});
  return `${dateStr} at ${timeStr}`;
};

export const shortDate = (date: Date | number | string, includeTodayAt: boolean): string => {
  const _date = new Date(date);
  const dateStr = _date.toLocaleDateString(undefined, {dateStyle: 'short'});
  const timeStr = _date.toLocaleTimeString(undefined, {timeStyle: 'short'});
  const todayAt = includeTodayAt ? 'Today at' : '';
  return isToday(_date) ? `${todayAt} ${timeStr}` : dateStr;
};

export const systemDate = (date: Date): string => {
  return date.toISOString().split('.')[0] + 'Z';
};
