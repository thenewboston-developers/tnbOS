import {useSelector} from 'react-redux';

import CardLabel from 'apps/Trade/components/CardLabel';
import {useActiveWalletNetwork, useTradeBalances} from 'apps/Trade/hooks';
import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const WalletHome: SFC = ({className}) => {
  const activeWalletNetwork = useActiveWalletNetwork();
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId);
  const {available, onHold, total} = useTradeBalances(activeWalletNetworkId!);

  const renderBalance = () => (
    <S.Balance>
      {renderBalanceLeft()}
      {renderBalanceRight()}
    </S.Balance>
  );

  const renderBalanceLeft = () => (
    <S.BalanceLeft>
      <CardLabel>Available Balance</CardLabel>
      <S.BalanceValue>
        {available.toLocaleString()} {activeWalletNetwork!.displayName}
      </S.BalanceValue>
    </S.BalanceLeft>
  );

  const renderBalanceRight = () => {
    const rows = [
      {
        key: 'Total Balance',
        value: total,
      },
      {
        key: 'On Hold',
        value: onHold,
      },
      {
        key: 'Available Balance',
        value: available,
      },
    ];

    return (
      <S.BalanceRight>
        <S.TickerTable networkId={activeWalletNetworkId!} rows={rows} />
      </S.BalanceRight>
    );
  };

  return (
    <S.Container className={className}>
      {renderBalance()}
      <S.Transactions />
    </S.Container>
  );
};

export default WalletHome;
