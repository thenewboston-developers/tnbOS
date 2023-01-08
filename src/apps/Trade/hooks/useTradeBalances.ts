import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getHoldingAccounts} from 'apps/Trade/selectors/state';
import {TradeBalances} from 'apps/Trade/types';
import {getBalanceDetails} from 'apps/Trade/utils/balances';
import {getBalances} from 'system/selectors/state';

const useTradeBalances = (networkId: string): TradeBalances => {
  const balances = useSelector(getBalances);
  const holdingAccounts = useSelector(getHoldingAccounts);

  return useMemo(() => {
    return getBalanceDetails(balances, holdingAccounts, networkId);
  }, [balances, holdingAccounts, networkId]);
};

export default useTradeBalances;
