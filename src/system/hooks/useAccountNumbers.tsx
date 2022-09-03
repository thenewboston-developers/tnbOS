import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAccounts} from 'system/selectors/state';

const useAccountNumbers = (): string[] => {
  const accounts = useSelector(getAccounts);

  const accountNumbersString = useMemo(() => Object.keys(accounts).sort().join('-'), [accounts]);

  return useMemo(() => accountNumbersString.split('-'), [accountNumbersString]);
};

export default useAccountNumbers;
