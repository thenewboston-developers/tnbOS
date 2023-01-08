import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveNetworkId} from 'apps/Trade/selectors/state';
import {getNetworks} from 'system/selectors/state';

const useAvailableActiveNetworkIds = (): string[] => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const networks = useSelector(getNetworks);

  return useMemo(() => {
    return Object.keys(networks).filter((networkId) => networkId !== activeNetworkId);
  }, [activeNetworkId, networks]);
};

export default useAvailableActiveNetworkIds;
