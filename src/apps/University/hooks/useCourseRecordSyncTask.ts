import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  COURSE_RECORD_SYNC_TASK_RUN_INTERVAL_SECONDS,
  MAX_COURSE_RECORD_DELIVERY_ATTEMPTS,
} from 'apps/University/constants/protocol';
import useConnectedAccounts from 'apps/University/hooks/useConnectedAccounts';
import {getCourseRecordRecipients} from 'apps/University/selectors/state';
import {setCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const useCourseRecordSyncTask = () => {
  const connectedAccounts = useConnectedAccounts();
  const courseRecordRecipients = useSelector(getCourseRecordRecipients);
  const dispatch = useDispatch<AppDispatch>();

  const recipientAccountNumbers = useMemo(() => {
    return Object.keys(connectedAccounts).filter((accountNumber) => {
      const recipient = courseRecordRecipients[accountNumber];
      return !recipient || (!recipient.delivered && recipient.deliveryAttempts < MAX_COURSE_RECORD_DELIVERY_ATTEMPTS);
    });
  }, [connectedAccounts, courseRecordRecipients]);

  const run = useCallback(() => {
    (async () => {
      try {
        for (const recipientAccountNumber of recipientAccountNumbers) {
          console.log('~~~~ Sending the course record from useCourseRecordSyncTask ~~~~');
          console.log(recipientAccountNumber);
          console.log(connectedAccounts[recipientAccountNumber]);

          const courseRecordRecipient = courseRecordRecipients[recipientAccountNumber];
          const deliveryAttempts = courseRecordRecipient.deliveryAttempts || 0;

          dispatch(
            setCourseRecordRecipient({
              accountNumber: recipientAccountNumber,
              delivered: false,
              deliveryAttempts: deliveryAttempts + 1,
            }),
          );
          // Send course record block
        }
      } catch (error) {
        displayErrorToast('Error sending the course record');
      }
    })();
  }, [connectedAccounts, courseRecordRecipients, dispatch, recipientAccountNumbers]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), COURSE_RECORD_SYNC_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useCourseRecordSyncTask;
