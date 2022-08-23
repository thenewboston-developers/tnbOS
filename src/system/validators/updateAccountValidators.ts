import {Self} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';

const messageSchema = yup.object({
  account_number: accountNumberSchema.required(),
  balance: yup.number().integer().min(0).required(),
});

export const updateAccountValidator = yup.object({
  message: messageSchema.required(),
});

export const validateIsSelfAccountNumber = (accountNumber: string, self: Self) => {
  if (accountNumber !== self.accountNumber) throw new Error('Invalid account number');
};
