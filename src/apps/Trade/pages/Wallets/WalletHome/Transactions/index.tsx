import {useSelector} from 'react-redux';

import CardLabel from 'apps/Trade/components/CardLabel';
import EmptyState from 'apps/Trade/components/EmptyState';
import Transaction from 'apps/Trade/components/Transaction';
import {Transaction as TTransaction, TransactionPerspective} from 'apps/Trade/types';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import TransactionsEmptyStateGraphic from './assets/transactions-empty-state.png';
import * as S from './Styles';

const Transactions: SFC = ({className}) => {
  const self = useSelector(getSelf);

  const getPerspective = (transaction: TTransaction): TransactionPerspective => {
    return transaction.sender.toLowerCase() === getViewer().toLowerCase()
      ? TransactionPerspective.sender
      : TransactionPerspective.receiver;
  };

  const getViewer = () => {
    return self.accountNumber;
  };

  const renderTransactions = () => {
    return [].map((transaction) => <Transaction perspective={getPerspective(transaction)} transaction={transaction} />);
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
      {!![].length ? renderTransactions() : renderTransactionsEmptyState()}
    </S.Container>
  );
};

export default Transactions;
