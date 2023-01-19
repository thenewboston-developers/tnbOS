import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveLearnLectureId, getLectures} from 'apps/University/selectors/state';
import {Lecture} from 'apps/University/types';

const useActiveLearnLecture = (): Lecture | undefined => {
  const activeLearnLectureId = useSelector(getActiveLearnLectureId);
  const lectures = useSelector(getLectures);

  return useMemo(() => {
    return lectures[activeLearnLectureId];
  }, [activeLearnLectureId, lectures]);
};

export default useActiveLearnLecture;
