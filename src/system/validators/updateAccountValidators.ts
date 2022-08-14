import {Self} from 'system/types/self';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';

export const updateAccountValidator = yup.object({
  account_number: accountNumberSchema.required(),
  balance: yup.number().integer().min(0),
});

export const validateIsSelfAccountNumber = (accountNumber: string, self: Self) => {
  if (accountNumber !== self.accountNumber) throw new Error('Invalid account number');
};
