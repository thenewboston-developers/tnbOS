import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAccountOnlineStatuses} from 'system/selectors/state';
import {OnlineStatus} from 'system/types';

const useOnlineAccountNumbers = (): string[] => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);

  return useMemo(() => {
    return Object.keys(accountOnlineStatuses).filter(
      (accountNumber) => accountOnlineStatuses[accountNumber] === OnlineStatus.online,
    );
  }, [accountOnlineStatuses]);
};

export default useOnlineAccountNumbers;
