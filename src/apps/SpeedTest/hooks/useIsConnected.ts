import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveAccountNumber, getActiveNetworkId} from 'apps/SpeedTest/selectors/state';
import {getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {OnlineStatus} from 'system/types/onlineStatuses';

const useIsConnected = (): boolean => {
  const activeAccountNumber = useSelector(getActiveAccountNumber);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  return useMemo(() => {
    if (!activeAccountNumber || !activeNetworkId) return false;
    return networkAccountOnlineStatuses[activeNetworkId]?.[activeAccountNumber] === OnlineStatus.online;
  }, [activeAccountNumber, activeNetworkId, networkAccountOnlineStatuses]);
};

export default useIsConnected;
