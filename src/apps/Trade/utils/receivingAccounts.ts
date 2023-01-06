import {ReceivingAccount, Transaction, Transactions} from 'apps/Trade/types';

export const getReceivingAccountOutgoingTransactions = (
  receivingAccount: ReceivingAccount,
  networkId: string,
  transactions: Transactions,
): Transaction[] => {
  const {orderId} = receivingAccount;

  const orderTransactions = transactions[orderId];
  if (!orderTransactions) return [];

  const transactionsList = Object.values(orderTransactions[networkId]);
  return transactionsList.filter(({sender}) => sender === receivingAccount.accountNumber);
};
