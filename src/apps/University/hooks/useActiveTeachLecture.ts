import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveTeachLectureId, getLectures} from 'apps/University/selectors/state';
import {Lecture} from 'apps/University/types';

const useActiveTeachLecture = (): Lecture | undefined => {
  const activeTeachLectureId = useSelector(getActiveTeachLectureId);
  const lectures = useSelector(getLectures);

  return useMemo(() => {
    return lectures[activeTeachLectureId];
  }, [activeTeachLectureId, lectures]);
};

export default useActiveTeachLecture;
