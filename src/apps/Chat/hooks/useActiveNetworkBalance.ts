import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveNetworkId} from 'apps/Chat/selectors/state';
import {getBalances} from 'system/selectors/state';

const useActiveNetworkBalance = (): number => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const balances = useSelector(getBalances);

  return useMemo(() => {
    if (!activeNetworkId) return 0;
    return balances[activeNetworkId] || 0;
  }, [activeNetworkId, balances]);
};

export default useActiveNetworkBalance;
