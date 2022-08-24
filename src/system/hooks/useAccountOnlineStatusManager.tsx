import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getAccounts, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {setAccountOnlineStatuses} from 'system/store/accountOnlineStatuses';
import {AccountOnlineStatuses, AppDispatch, OnlineStatus} from 'system/types';

const useAccountOnlineStatusManager = () => {
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  const accountNumbersString = useMemo(() => Object.keys(accounts).sort().join('-'), [accounts]);

  const accountNumbers = useMemo(() => accountNumbersString.split('-'), [accountNumbersString]);

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
