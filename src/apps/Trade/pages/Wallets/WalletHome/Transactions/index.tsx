import CardLabel from 'apps/Trade/components/CardLabel';
import EmptyState from 'apps/Trade/components/EmptyState';
import Transaction from 'apps/Trade/components/Transaction';
import {SFC} from 'system/types';
import TransactionsEmptyStateGraphic from './assets/transactions-empty-state.png';
import * as S from './Styles';

const Transactions: SFC = ({className}) => {
  const transactions = [
    {
      amount: 20,
      createdDate: '2022-11-19T20:51:27Z',
      orderId: null,
      recipient: 'aaa7484c7c5f41901606631a771fcae7873cae2edac78c5597ba1472a1874dd6',
      sender: 'f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0',
      signature: 'd07e5d0d11c97ec914149c5119bc1f4277e1be5f202',
      transactionFee: 1,
      transactionId: 'tx-123-sample',
    },
    {
      amount: 30,
      createdDate: '2022-11-20T20:51:27Z',
      orderId: 'order-abc-sample',
      recipient: 'f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0',
      sender: 'bbb7484c7c5f41901606631a771fcae7873cae2edac78c5597ba1472a1874dd6',
      signature: 'd07e5d0d11c97ec914149c5119bc1f4277e1be5f202',
      transactionFee: 1,
      transactionId: 'tx-456-sample',
    },
  ];

  const renderTransactions = () => {
    if (!transactions.length) return renderTransactionsEmptyState();
    return transactions.map((transaction) => <Transaction key={transaction.transactionId} transaction={transaction} />);
  };

  const renderTransactionsEmptyState = () => (
    <EmptyState
      bottomText="No transactions to display."
      graphic={TransactionsEmptyStateGraphic}
      topText="Nothing here!"
    />
  );

  return (
    <S.Container className={className}>
      <CardLabel>Transactions</CardLabel>
      {renderTransactions()}
    </S.Container>
  );
};

export default Transactions;
