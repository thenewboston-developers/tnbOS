import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveNetworkId} from 'apps/Trade/selectors/state';
import {getBalances} from 'system/selectors/state';

const useActiveNetworkBalance = (): number => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const balances = useSelector(getBalances);

  return useMemo(() => {
    return (activeNetworkId && balances[activeNetworkId]) || 0;
  }, [activeNetworkId, balances]);
};

export default useActiveNetworkBalance;
