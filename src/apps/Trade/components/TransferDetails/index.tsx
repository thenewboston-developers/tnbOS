import {ReactNode} from 'react';

import {TickerTableRow} from 'apps/Trade/components/TickerTable';
import {SFC} from 'system/types';
import * as S from './Styles';

interface TransferDetailsProps {
  networkId: string;
  rows: TickerTableRow[];
  transactions: ReactNode[];
}

const TransferDetails: SFC<TransferDetailsProps> = ({className, networkId, rows, transactions}) => {
  const renderTransactionsEmptyState = () => {
    return <S.TransactionsEmptyState>No transactions to display.</S.TransactionsEmptyState>;
  };

  return (
    <S.Container className={className}>
      <S.TickerTable networkId={networkId} rows={rows} />
      {!!transactions.length ? <S.Transactions>{transactions}</S.Transactions> : renderTransactionsEmptyState()}
    </S.Container>
  );
};

export default TransferDetails;
