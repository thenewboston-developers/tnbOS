import {Dict} from 'system/types';

export const sortAttributesAlphabetically = <T>(object: Dict<any>): T => {
  const keys = Object.keys(object);
  keys.sort();

  return keys.reduce(
    (previousValue, key) => ({
      ...previousValue,
      [key]: object[key],
    }),
    {} as T,
  );
};
