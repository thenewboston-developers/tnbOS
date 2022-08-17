import DefaultAvatar from 'system/assets/default-avatar.png';
import {Accounts} from 'system/types';
import {truncate} from 'system/utils/strings';

export const safeDisplayImage = (accountNumber: string, accounts: Accounts) => {
  const account = accounts[accountNumber];
  return account?.displayImage || DefaultAvatar;
};

export const safeDisplayName = (accountNumber: string, accounts: Accounts, maxLength?: number) => {
  const account = accounts[accountNumber];
  const results = account?.displayName || accountNumber;
  return maxLength ? truncate(results, maxLength) : results;
};
