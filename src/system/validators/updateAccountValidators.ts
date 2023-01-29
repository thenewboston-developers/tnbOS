import yup, {accountNumberSchema} from 'system/utils/yup';

const messageSchema = yup
  .object({
    account_number: accountNumberSchema.required(),
    balance: yup.number().integer().min(0).required(),
  })
  .noUnknown();

export const updateAccountValidator = yup.object({
  message: messageSchema.required(),
});
