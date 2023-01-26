import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setCourseRecordBlock} from 'apps/University/blocks';
import {
  COURSE_RECORD_SYNC_TASK_RUN_INTERVAL_SECONDS,
  MAX_COURSE_RECORD_DELIVERY_ATTEMPTS,
} from 'apps/University/constants/protocol';
import useSelfCourseRecord from 'apps/University/hooks/useSelfCourseRecord';
import {getCourseRecordRecipients} from 'apps/University/selectors/state';
import {setCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const useCourseRecordSyncTask = () => {
  const connectedAccounts = useConnectedAccounts();
  const courseRecord = useSelfCourseRecord();
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
      if (!courseRecord) return;

      for (const recipientAccountNumber of recipientAccountNumbers) {
        const courseRecordRecipient = courseRecordRecipients[recipientAccountNumber];
        const deliveryAttempts = courseRecordRecipient?.deliveryAttempts || 0;

        try {
          await setCourseRecordBlock({
            networkId: connectedAccounts[recipientAccountNumber],
            params: courseRecord,
            recipient: recipientAccountNumber,
          });
        } catch (error) {
          displayErrorToast('Error sending the course record');
        } finally {
          dispatch(
            setCourseRecordRecipient({
              accountNumber: recipientAccountNumber,
              delivered: false,
              deliveryAttempts: deliveryAttempts + 1,
            }),
          );
        }
      }
    })();
  }, [connectedAccounts, courseRecord, courseRecordRecipients, dispatch, recipientAccountNumbers]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), COURSE_RECORD_SYNC_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useCourseRecordSyncTask;
