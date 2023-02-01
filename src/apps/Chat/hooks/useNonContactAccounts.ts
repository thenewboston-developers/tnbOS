import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getContacts} from 'apps/Chat/selectors/state';
import {getAccounts} from 'system/selectors/state';
import {Accounts} from 'system/types';

const useNonContactAccounts = () => {
  const accounts = useSelector(getAccounts);
  const contacts = useSelector(getContacts);

  return useMemo((): Accounts => {
    const contactAccountNumbers = Object.keys(contacts);
    return Object.values(accounts).reduce((previousValue, account) => {
      return contactAccountNumbers.includes(account.accountNumber)
        ? previousValue
        : {...previousValue, [account.accountNumber]: account};
    }, {});
  }, [accounts, contacts]);
};

export default useNonContactAccounts;
