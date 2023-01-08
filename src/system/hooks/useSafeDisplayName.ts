import {useSelector} from 'react-redux';

import {getAccounts, getSelf} from 'system/selectors/state';
import {truncate} from 'system/utils/strings';

const useSafeDisplayName = (accountNumber: string, maxLength?: number) => {
  const accounts = useSelector(getAccounts);
  const self = useSelector(getSelf);

  const account = self.accountNumber === accountNumber ? self : accounts[accountNumber];
  const results = account?.displayName || accountNumber;

  return maxLength ? truncate(results, maxLength) : results;
};

export default useSafeDisplayName;
