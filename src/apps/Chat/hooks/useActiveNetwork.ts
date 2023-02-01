import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveNetworkId} from 'apps/Chat/selectors/state';
import {getNetworks} from 'system/selectors/state';
import {Network} from 'system/types';

const useActiveNetwork = (): Network | null => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const networks = useSelector(getNetworks);

  return useMemo(() => {
    if (!activeNetworkId) return null;
    return networks[activeNetworkId] || null;
  }, [activeNetworkId, networks]);
};

export default useActiveNetwork;
