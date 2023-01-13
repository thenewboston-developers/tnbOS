import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getEnrollments} from 'apps/University/selectors/state';

const useIsSelfEnrolled = (courseId: string | undefined): boolean => {
  const enrollments = useSelector(getEnrollments);

  return useMemo(() => {
    if (!courseId) return false;
    return !!enrollments[courseId];
  }, [courseId, enrollments]);
};

export default useIsSelfEnrolled;
