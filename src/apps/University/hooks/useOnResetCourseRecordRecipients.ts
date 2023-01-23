import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import useConnectedAccounts from 'apps/University/hooks/useConnectedAccounts';
import {getCourseRecordRecipients} from 'apps/University/selectors/state';
import {setCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {CourseRecordRecipients} from 'apps/University/types';
import {AppDispatch} from 'system/types';

/*
 * This hook is triggered when courseRecordRecipients is reset due to an update in the course record.
 * When this happens, this hook will send connections the initial (updated) course record block.
 * A separate hook is responsible for the retry logic.
 * */

let prevCourseRecordRecipients: CourseRecordRecipients = {};

const useOnResetCourseRecordRecipients = () => {
  const connectedAccounts = useConnectedAccounts();
  const courseRecordRecipients = useSelector(getCourseRecordRecipients);
  const dispatch = useDispatch<AppDispatch>();

  if (!isEmpty(prevCourseRecordRecipients) && isEmpty(courseRecordRecipients)) {
    for (const [accountNumber, defaultNetworkId] of Object.entries(connectedAccounts)) {
      console.log('~~~~ Sending the course record from useOnResetCourseRecordRecipients ~~~~');
      console.log(`${accountNumber} -> ${defaultNetworkId}`);

      dispatch(
        setCourseRecordRecipient({
          accountNumber,
          delivered: false,
          deliveryAttempts: 1,
        }),
      );
      // Send course record block
    }
  }

  useEffect(() => {
    prevCourseRecordRecipients = courseRecordRecipients;
  }, [courseRecordRecipients]);
};

export default useOnResetCourseRecordRecipients;
