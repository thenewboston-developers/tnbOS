import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import CardLabel from 'apps/Trade/components/CardLabel';
import EmptyState from 'apps/Trade/components/EmptyState';
import NetworkBlock from 'apps/Trade/components/NetworkBlock';
import {useActiveWalletNetwork} from 'apps/Trade/hooks';
import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {useNetworkBlocks} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {NetworkBlock as TNetworkBlock, SFC} from 'system/types';
import TransactionsEmptyStateGraphic from './assets/transactions-empty-state.png';
import * as S from './Styles';

const PAGINATION_SIZE = 10;

const NetworkBlocks: SFC = ({className}) => {
  const [maxLength, setMaxLength] = useState<number>(PAGINATION_SIZE);
  const activeWalletNetwork = useActiveWalletNetwork();
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId);
  const networkBlocks = useNetworkBlocks(activeWalletNetworkId!);
  const self = useSelector(getSelf);

  const networkBlockList = useMemo((): TNetworkBlock[] => {
    return orderBy(Object.values(networkBlocks), ['date'], ['desc'])
      .filter(({recipient, sender}) => [recipient, sender].includes(self.accountNumber))
      .filter(({amount}) => amount > 0);
  }, [networkBlocks, self.accountNumber]);

  const renderNetworkBlock = () => {
    if (!networkBlockList.length) return renderTransactionsEmptyState();
    const length = Math.min(networkBlockList.length, maxLength);
    const results = networkBlockList.slice(0, length);
    return results.map((networkBlock) => (
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

  const renderViewMore = () => {
    if (maxLength >= networkBlockList.length) return null;
    return <S.ViewMore onClick={() => setMaxLength(maxLength + PAGINATION_SIZE)} />;
  };

  return (
    <S.Container className={className}>
      <CardLabel>Transactions</CardLabel>
      {renderNetworkBlock()}
      {renderViewMore()}
    </S.Container>
  );
};

export default NetworkBlocks;
