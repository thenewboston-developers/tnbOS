import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {AccountOnlineStatuses} from 'system/types';

const useUsersNetworkAccountOnlineStatuses = (accountNumber: string): AccountOnlineStatuses => {
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  return useMemo(() => {
    const results: AccountOnlineStatuses = {};

    for (const [networkId, accountOnlineStatuses] of Object.entries(networkAccountOnlineStatuses)) {
      const accountOnlineStatus = accountOnlineStatuses[accountNumber];
      if (accountOnlineStatus) results[networkId] = accountOnlineStatus;
    }

    return results;
  }, [accountNumber, networkAccountOnlineStatuses]);
};

export default useUsersNetworkAccountOnlineStatuses;
