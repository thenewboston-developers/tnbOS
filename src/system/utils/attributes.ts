import {Dict} from 'system/types';

export const sortAttributesAlphabetically = (object: Dict<any>) => {
  const keys = Object.keys(object);
  keys.sort();

  return keys.reduce(
    (previousValue, key) => ({
      ...previousValue,
      [key]: object[key],
    }),
    {},
  );
};
