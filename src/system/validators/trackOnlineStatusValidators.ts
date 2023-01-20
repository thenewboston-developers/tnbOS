import {Accounts, Self} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

export const trackOnlineStatusValidator = yup.object({
  account_number: accountNumberSchema.required(),
  is_online: yup.boolean().required(),
});

export const validateIsKnownAccount = (accountNumber: string, accounts: Accounts) => {
  if (!accounts[accountNumber]) throw new Error('Unknown account');
};

export const validateIsNotSelfAccountNumber = (accountNumber: string, self: Self) => {
  if (accountNumber === self.accountNumber) throw new Error('Unable to track online status of self');
};
