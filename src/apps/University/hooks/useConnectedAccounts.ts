import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAccountOnlineStatuses, getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {Dict, OnlineStatus} from 'system/types';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';

const useConnectedAccounts = (): Dict<string> => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);
  const balances = useSelector(getBalances);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  return useMemo(() => {
    return Object.entries(accountOnlineStatuses).reduce((previousValue, [accountNumber, onlineStatus]) => {
      if (onlineStatus === OnlineStatus.offline) return previousValue;

      const defaultNetworkId = getRecipientsDefaultNetworkId({
        balances,
        networkAccountOnlineStatuses,
        recipient: accountNumber,
      });

      if (!defaultNetworkId) return previousValue;

      return {
        ...previousValue,
        [accountNumber]: defaultNetworkId,
      };
    }, {});
  }, [accountOnlineStatuses, balances, networkAccountOnlineStatuses]);
};

export default useConnectedAccounts;
