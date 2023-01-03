import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {getNetworks} from 'system/selectors/state';
import {Network} from 'system/types';

const useActiveWalletNetwork = (): Network | undefined => {
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId);
  const networks = useSelector(getNetworks);

  return useMemo(() => {
    return activeWalletNetworkId ? networks[activeWalletNetworkId] : undefined;
  }, [activeWalletNetworkId, networks]);
};

export default useActiveWalletNetwork;
