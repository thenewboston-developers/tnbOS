import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import CardLabel from 'apps/Trade/components/CardLabel';
import EmptyState from 'apps/Trade/components/EmptyState';
import NetworkBlock from 'apps/Trade/components/NetworkBlock';
import {useActiveWalletNetwork} from 'apps/Trade/hooks';
import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {useNetworkBlocks} from 'system/hooks';
import {NetworkBlock as TNetworkBlock, SFC} from 'system/types';
import TransactionsEmptyStateGraphic from './assets/transactions-empty-state.png';
import * as S from './Styles';

const NetworkBlocks: SFC = ({className}) => {
  const activeWalletNetwork = useActiveWalletNetwork();
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId);
  const networkBlocks = useNetworkBlocks(activeWalletNetworkId!);

  const filteredNetworkBlocks = useMemo((): TNetworkBlock[] => {
    return orderBy(Object.values(networkBlocks), ['date'], ['desc']).filter(({amount}) => amount > 0);
  }, [networkBlocks]);

  const renderNetworkBlock = () => {
    if (!filteredNetworkBlocks.length) return renderTransactionsEmptyState();
    return filteredNetworkBlocks.map((networkBlock) => (
      <NetworkBlock
        key={networkBlock.signature}
        networkBlock={networkBlock}
        networkDisplayName={activeWalletNetwork!.displayName}
      />
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
      {renderNetworkBlock()}
    </S.Container>
  );
};

export default NetworkBlocks;
