import yup from 'system/utils/yup';

export const pingValidator = yup.object({
  runId: yup.string().required().uuid(),
});
