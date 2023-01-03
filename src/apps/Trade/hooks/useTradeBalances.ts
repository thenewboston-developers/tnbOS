import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {TradeBalances} from 'apps/Trade/types';
import {getBalances} from 'system/selectors/state';

const useTradeBalances = (networkId: string): TradeBalances => {
  const balances = useSelector(getBalances);

  return useMemo(() => {
    const available = balances[networkId] || 0;

    // TODO: Update logic
    const onHold = 100;

    return {
      available,
      onHold,
      total: available + onHold,
    };
  }, [balances, networkId]);
};

export default useTradeBalances;
