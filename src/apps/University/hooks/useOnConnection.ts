import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import difference from 'lodash/difference';

import {setCourseRecordBlock} from 'apps/University/blocks';
import useSelfCourseRecord from 'apps/University/hooks/useSelfCourseRecord';
import {setCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch, Dict} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

let prevConnectedAccounts: Dict<string> = {};

const useOnConnection = () => {
  const connectedAccounts = useConnectedAccounts();
  const courseRecord = useSelfCourseRecord();
  const dispatch = useDispatch<AppDispatch>();

  const connectedAccountNumbers = Object.keys(connectedAccounts);
  const prevConnectedAccountNumbers = Object.keys(prevConnectedAccounts);

  (async () => {
    if (!courseRecord) return;

    for (const accountNumber of difference(connectedAccountNumbers, prevConnectedAccountNumbers)) {
      try {
        await setCourseRecordBlock({
          networkId: connectedAccounts[accountNumber],
          params: courseRecord,
          recipient: accountNumber,
        });
      } catch (error) {
        displayErrorToast('Error sending the course record');
      } finally {
        dispatch(
          setCourseRecordRecipient({
            accountNumber,
            delivered: false,
            deliveryAttempts: 1,
          }),
        );
      }
    }
  })();

  useEffect(() => {
    prevConnectedAccounts = connectedAccounts;
  }, [connectedAccounts]);
};

export default useOnConnection;
