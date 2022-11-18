import yup from 'system/utils/forms/yup';

export const pingValidator = yup.object({
  runId: yup.string().required().uuid(),
});
