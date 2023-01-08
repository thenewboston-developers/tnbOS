import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAccountOnlineStatuses} from 'system/selectors/state';
import {OnlineStatus} from 'system/types';

const useAccountOnlineStatus = (accountNumber: string): OnlineStatus => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);

  return useMemo(() => {
    const accountOnlineStatus = accountOnlineStatuses[accountNumber];
    return accountOnlineStatus || OnlineStatus.offline;
  }, [accountNumber, accountOnlineStatuses]);
};

export default useAccountOnlineStatus;
