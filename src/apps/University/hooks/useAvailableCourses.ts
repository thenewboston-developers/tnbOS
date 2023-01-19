import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCourses, getEnrollments} from 'apps/University/selectors/state';
import {Course} from 'apps/University/types';
import {getSelf} from 'system/selectors/state';

const useAvailableCourses = (): Course[] => {
  const courses = useSelector(getCourses);
  const enrollments = useSelector(getEnrollments);
  const self = useSelector(getSelf);

  return useMemo(() => {
    const enrolledCourseIds = Object.keys(enrollments);

    return Object.values(courses)
      .filter(({courseId}) => !enrolledCourseIds.includes(courseId))
      .filter(({instructor}) => instructor !== self.accountNumber);
  }, [courses, enrollments, self.accountNumber]);
};

export default useAvailableCourses;
