import {ReceivingAccount, Transaction, Transactions} from 'apps/Trade/types';
import isEmpty from 'lodash/isEmpty';

export const getReceivingAccountOutgoingTransactions = (
  receivingAccount: ReceivingAccount,
  networkId: string,
  transactions: Transactions,
): Transaction[] => {
  const {orderId} = receivingAccount;

  const orderTransactions = transactions[orderId];
  if (!orderTransactions || isEmpty(orderTransactions)) return [];

  const networkTransactions = orderTransactions[networkId];
  if (!networkTransactions || isEmpty(networkTransactions)) return [];

  const transactionsList = Object.values(networkTransactions);
  return transactionsList.filter(({sender}) => sender === receivingAccount.accountNumber);
};
