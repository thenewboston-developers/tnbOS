import {ReceivingAccount, Transaction, Transactions} from 'apps/Trade/types';

export const getReceivingAccountOutgoingTransactions = (
  receivingAccount: ReceivingAccount,
  networkId: string,
  transactions: Transactions,
): Transaction[] => {
  const {orderId} = receivingAccount;
  const transactionsList = Object.values(transactions[orderId][networkId]);
  return transactionsList.filter(({sender}) => sender === receivingAccount.accountNumber);
};
