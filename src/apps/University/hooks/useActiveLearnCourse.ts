import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveLearnCourseId, getCourses} from 'apps/University/selectors/state';
import {Course} from 'apps/University/types';

const useActiveLearnCourse = (): Course | undefined => {
  const activeLearnCourseId = useSelector(getActiveLearnCourseId);
  const courses = useSelector(getCourses);

  return useMemo(() => {
    return courses[activeLearnCourseId];
  }, [activeLearnCourseId, courses]);
};

export default useActiveLearnCourse;
