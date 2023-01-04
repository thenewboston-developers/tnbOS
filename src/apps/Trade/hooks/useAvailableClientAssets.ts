import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveNetworkId, getOffers} from 'apps/Trade/selectors/state';
import {getNetworks} from 'system/selectors/state';

const useAvailableClientAssets = (): string[] => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const networks = useSelector(getNetworks);
  const offers = useSelector(getOffers);

  return useMemo(() => {
    const existingClientAssets = offers
      .filter(({hostAsset}) => activeNetworkId === hostAsset)
      .map(({clientAsset}) => clientAsset);

    const excludedNetworkIds = [...existingClientAssets, activeNetworkId];

    return Object.keys(networks).filter((networkId) => !excludedNetworkIds.includes(networkId));
  }, [activeNetworkId, networks, offers]);
};

export default useAvailableClientAssets;
