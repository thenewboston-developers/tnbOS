import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';

const useRecipientsDefaultNetworkId = (recipient: string): string | null => {
  const balances = useSelector(getBalances);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  return useMemo(() => {
    return getRecipientsDefaultNetworkId({balances, networkAccountOnlineStatuses, recipient});
  }, [balances, networkAccountOnlineStatuses, recipient]);
};

export default useRecipientsDefaultNetworkId;
