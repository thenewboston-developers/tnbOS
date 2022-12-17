export const formatDate = (date: Date | number | string): string => {
  const _date = new Date(date);
  const dateStr = _date.toLocaleDateString(undefined, {dateStyle: 'long'});
  const timeStr = _date.toLocaleTimeString(undefined, {timeStyle: 'short'});
  return `${dateStr} at ${timeStr.toLowerCase()}`;
};
