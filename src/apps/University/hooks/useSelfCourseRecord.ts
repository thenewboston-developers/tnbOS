import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCourseRecords} from 'apps/University/selectors/state';
import {CourseRecord} from 'apps/University/types';
import {getSelf} from 'system/selectors/state';

const useSelfCourseRecord = (): CourseRecord | undefined => {
  const courseRecords = useSelector(getCourseRecords);
  const self = useSelector(getSelf);

  return useMemo(() => {
    return courseRecords[self.accountNumber];
  }, [courseRecords, self.accountNumber]);
};

export default useSelfCourseRecord;
