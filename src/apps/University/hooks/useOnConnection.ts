import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import difference from 'lodash/difference';

import useConnectedAccounts from 'apps/University/hooks/useConnectedAccounts';
import {setCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {AppDispatch, Dict} from 'system/types';

let prevConnectedAccounts: Dict<string> = {};

const useOnConnection = () => {
  const connectedAccounts = useConnectedAccounts();
  const dispatch = useDispatch<AppDispatch>();

  const connectedAccountNumbers = Object.keys(connectedAccounts);
  const prevConnectedAccountNumbers = Object.keys(prevConnectedAccounts);

  (async () => {
    for (const accountNumber of difference(connectedAccountNumbers, prevConnectedAccountNumbers)) {
      console.log('~~~~ Sending the course record from useOnConnection ~~~~');
      console.log(accountNumber);
      console.log(connectedAccounts[accountNumber]);

      dispatch(
        setCourseRecordRecipient({
          accountNumber,
          delivered: false,
          deliveryAttempts: 1,
        }),
      );
      // Send course record block
    }
  })();

  useEffect(() => {
    prevConnectedAccounts = connectedAccounts;
  }, [connectedAccounts]);
};

export default useOnConnection;
