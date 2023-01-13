import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCourses, getEnrollments} from 'apps/University/selectors/state';
import {Course} from 'apps/University/types';

const useEnrolledCourses = (): Course[] => {
  const courses = useSelector(getCourses);
  const enrollments = useSelector(getEnrollments);

  return useMemo(() => {
    const enrolledCourseIds = Object.keys(enrollments);
    return enrolledCourseIds.map((courseId) => courses[courseId]);
  }, [courses, enrollments]);
};

export default useEnrolledCourses;
