import {useSelector} from 'react-redux';

import CardLabel from 'apps/Trade/components/CardLabel';
import {useActiveWalletNetwork} from 'apps/Trade/hooks';
import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {getBalances} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const WalletHome: SFC = ({className}) => {
  const activeWalletNetwork = useActiveWalletNetwork();
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId);
  const balances = useSelector(getBalances);

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
        {balances[activeWalletNetworkId!].toLocaleString()} {activeWalletNetwork!.displayName}
      </S.BalanceValue>
    </S.BalanceLeft>
  );

  const renderBalanceRight = () => {
    const rows = [
      {
        key: 'Total Balance',
        value: 4000,
      },
      {
        key: 'On Hold',
        value: 5000,
      },
      {
        key: 'Available Balance',
        value: 6000,
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
