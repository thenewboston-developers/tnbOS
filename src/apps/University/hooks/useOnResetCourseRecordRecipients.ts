import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {setCourseRecordBlock} from 'apps/University/blocks';
import useSelfCourseRecord from 'apps/University/hooks/useSelfCourseRecord';
import {getCourseRecordRecipients} from 'apps/University/selectors/state';
import {setCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {CourseRecordRecipients} from 'apps/University/types';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

/*
 * This hook is triggered when courseRecordRecipients is reset due to an update in the course record.
 * When this happens, this hook will send connections the initial (updated) course record block.
 * A separate hook is responsible for the retry logic.
 * */

let prevCourseRecordRecipients: CourseRecordRecipients = {};

const useOnResetCourseRecordRecipients = () => {
  const connectedAccounts = useConnectedAccounts();
  const courseRecord = useSelfCourseRecord();
  const courseRecordRecipients = useSelector(getCourseRecordRecipients);
  const dispatch = useDispatch<AppDispatch>();

  if (!isEmpty(prevCourseRecordRecipients) && isEmpty(courseRecordRecipients)) {
    (async () => {
      if (!courseRecord) return;

      for (const [accountNumber, defaultNetworkId] of Object.entries(connectedAccounts)) {
        try {
          await setCourseRecordBlock({
            networkId: defaultNetworkId,
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
  }

  useEffect(() => {
    prevCourseRecordRecipients = courseRecordRecipients;
  }, [courseRecordRecipients]);
};

export default useOnResetCourseRecordRecipients;
