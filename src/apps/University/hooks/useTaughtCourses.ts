import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getCourses} from 'apps/University/selectors/state';
import {Course} from 'apps/University/types';
import {getSelf} from 'system/selectors/state';

const useTaughtCourses = (): Course[] => {
  const courses = useSelector(getCourses);
  const self = useSelector(getSelf);

  return useMemo(() => {
    return Object.values(courses).filter(({instructor}) => instructor === self.accountNumber);
  }, [courses, self.accountNumber]);
};

export default useTaughtCourses;
