import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getLectures} from 'apps/University/selectors/state';
import {Lecture} from 'apps/University/types';

const useCourseLectures = (courseId: string | null | undefined): Lecture[] => {
  const lectures = useSelector(getLectures);

  return useMemo(() => {
    if (!courseId) return [];
    return Object.values(lectures).filter((lecture) => courseId === lecture.courseId);
  }, [courseId, lectures]);
};

export default useCourseLectures;
