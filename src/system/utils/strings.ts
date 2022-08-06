export const truncate = (str: string, size: number): string => {
  return str.length <= size ? str : `${str.slice(0, size)}...`;
};
