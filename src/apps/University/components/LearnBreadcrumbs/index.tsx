import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiChevronRight} from '@mdi/js';
import Icon from '@mdi/react';

import {useActiveLearnLecture} from 'apps/University/hooks';
import {getCourses} from 'apps/University/selectors/state';
import {setActiveLearnCourseId, setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const LearnBreadcrumbs: SFC = ({className}) => {
  const courses = useSelector(getCourses);
  const dispatch = useDispatch<AppDispatch>();
  const lecture = useActiveLearnLecture();

  const course = useMemo(() => {
    return courses[lecture!.courseId];
  }, [courses, lecture]);

  const handleCourseNameClick = () => {
    dispatch(setActiveLearnCourseId(course.courseId));
    dispatch(setActivePage(Page.learnCourseHome));
  };

  return (
    <S.Container className={className}>
      <S.Item isActive={true} onClick={handleCourseNameClick}>
        {course.name}
      </S.Item>
      <Icon color="#999" path={mdiChevronRight} size="18px" />
      <S.Item>{lecture!.name}</S.Item>
    </S.Container>
  );
};

export default LearnBreadcrumbs;
