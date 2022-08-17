export const currentSystemDate = (): string => {
  return systemDate(new Date());
};

export const systemDate = (date: Date): string => {
  return date.toISOString().split('.')[0] + 'Z';
};
