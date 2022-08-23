import yup from 'system/utils/forms/yup';

export const setPeersValidator = yup.object({
  correlation_id: yup.string().required(),
  return_value: yup
    .mixed()
    .nullable()
    .test('is-null', 'Return value is not null', (return_value: any) => return_value === null),
});
