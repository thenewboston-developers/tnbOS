import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveTeachCourseId, getCourses} from 'apps/University/selectors/state';
import {Course} from 'apps/University/types';

const useActiveTeachCourse = (): Course | undefined => {
  const activeTeachCourseId = useSelector(getActiveTeachCourseId);
  const courses = useSelector(getCourses);

  return useMemo(() => {
    return courses[activeTeachCourseId];
  }, [activeTeachCourseId, courses]);
};

export default useActiveTeachCourse;
