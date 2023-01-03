import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import CardLabel from 'apps/Trade/components/CardLabel';
import EmptyState from 'apps/Trade/components/EmptyState';
import Transaction from 'apps/Trade/components/Transaction';
import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {useNetworkBlocks} from 'system/hooks';
import {NetworkBlock, SFC} from 'system/types';
import TransactionsEmptyStateGraphic from './assets/transactions-empty-state.png';
import * as S from './Styles';

const Transactions: SFC = ({className}) => {
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId);
  const networkBlocks = useNetworkBlocks(activeWalletNetworkId!);

  const filteredNetworkBlocks = useMemo((): NetworkBlock[] => {
    return orderBy(Object.values(networkBlocks), ['date'], ['desc']).filter(({amount}) => amount > 0);
  }, [networkBlocks]);

  const renderTransactions = () => {
    if (!filteredNetworkBlocks.length) return renderTransactionsEmptyState();
    return filteredNetworkBlocks.map((networkBlock) => (
      <Transaction key={networkBlock.signature} networkBlock={networkBlock} />
    ));
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
