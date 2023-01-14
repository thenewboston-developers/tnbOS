import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiChevronRight} from '@mdi/js';
import Icon from '@mdi/react';

import BreadcrumbItem from 'apps/University/components/BreadcrumbItem';
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
      <BreadcrumbItem isActive={true} onClick={handleCourseNameClick}>
        {course.name}
      </BreadcrumbItem>
      <Icon color="#ccc" path={mdiChevronRight} size="18px" />
      <BreadcrumbItem isActive={false}>{lecture!.name}</BreadcrumbItem>
    </S.Container>
  );
};

export default LearnBreadcrumbs;
