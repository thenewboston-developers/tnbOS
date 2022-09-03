import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useAccountNumbers} from 'system/hooks';
import {getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {setAccountOnlineStatuses} from 'system/store/accountOnlineStatuses';
import {AccountOnlineStatuses, AppDispatch, OnlineStatus} from 'system/types';

const useAccountOnlineStatusManager = () => {
  const accountNumbers = useAccountNumbers();
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  useEffect(() => {
    const results: AccountOnlineStatuses = {};

    for (const accountOnlineStatuses of Object.values(networkAccountOnlineStatuses)) {
      for (const [key, value] of Object.entries(accountOnlineStatuses)) {
        const accountNumber = key;
        const onlineStatus = value;

        if (onlineStatus === OnlineStatus.online) {
          results[accountNumber] = onlineStatus;
        }
      }
    }

    for (const accountNumber of accountNumbers) {
      if (!(accountNumber in results)) {
        results[accountNumber] = OnlineStatus.offline;
      }
    }

    dispatch(setAccountOnlineStatuses(results));
  }, [accountNumbers, dispatch, networkAccountOnlineStatuses]);
};

export default useAccountOnlineStatusManager;
