import {AuthSocketDataResult} from 'system/types';
import yup from 'system/utils/forms/yup';

export const authValidator = yup.object({
  result: yup
    .string()
    .required()
    .test('is-valid-result', 'Invalid result', (result: any) => Object.values(AuthSocketDataResult).includes(result)),
});
