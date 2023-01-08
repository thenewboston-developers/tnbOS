import {Transaction} from 'apps/Trade/types';

export const getTotalAmount = (transactions: Transaction[]): number => {
  return transactions.reduce((acc: number, transaction) => acc + transaction.amount, 0);
};
