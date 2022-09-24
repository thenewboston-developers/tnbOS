import yup, {accountNumberSchema} from 'system/utils/forms/yup';

const transferSchema = yup.object({
  amount: yup.number().required().integer().min(0),
  networkId: yup.string().required(),
});

export const setMessageValidator = yup.object({
  content: yup.string().defined(),
  createdDate: yup.date().required(),
  messageId: yup.string().required().uuid(),
  modifiedDate: yup.date().required(),
  recipient: accountNumberSchema.required(),
  sender: accountNumberSchema.required(),
  transfer: transferSchema.required().defined().nullable(),
});
