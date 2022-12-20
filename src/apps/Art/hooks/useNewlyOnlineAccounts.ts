import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import difference from 'lodash/difference';

import {getAccountOnlineStatuses} from 'system/selectors/state';
import {AccountOnlineStatuses, OnlineStatus} from 'system/types';

const useNewlyOnlineAccounts = () => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);
  const [previousAccountOnlineStatuses, setPreviousAccountOnlineStatuses] = useState(accountOnlineStatuses);

  useEffect(() => {
    setPreviousAccountOnlineStatuses(accountOnlineStatuses);
  }, [accountOnlineStatuses, previousAccountOnlineStatuses]);

  const getOnlineAccountNumbers = (values: AccountOnlineStatuses): string[] => {
    return Object.entries(values).reduce((previousValue: string[], [accountNumber, onlineStatus]) => {
      return onlineStatus === OnlineStatus.online ? [...previousValue, accountNumber] : previousValue;
    }, []);
  };

  if (JSON.stringify(accountOnlineStatuses) !== JSON.stringify(previousAccountOnlineStatuses)) {
    const onlineAccountNumbers = getOnlineAccountNumbers(accountOnlineStatuses);
    const prevOnlineAccountNumbers = getOnlineAccountNumbers(previousAccountOnlineStatuses);
    const newlyOnlineAccountNumbers = difference(onlineAccountNumbers, prevOnlineAccountNumbers);
    console.log(newlyOnlineAccountNumbers);
  }
};

export default useNewlyOnlineAccounts;
