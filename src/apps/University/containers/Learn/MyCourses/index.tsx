import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import {getCourses} from 'apps/University/selectors/state';
import {setActiveLearnCourseId, setActiveLearnPage} from 'apps/University/store/manager';
import {LearnPage} from 'apps/University/types';
import EmptyPage from 'system/components/EmptyPage';
import {AppDispatch, SFC} from 'system/types';

import MyCoursesEmptyStateGraphic from './assets/my-courses-empty-state.png';
import * as S from './Styles';

const MyCourses: SFC = ({className}) => {
  const courses = useSelector(getCourses);
  const dispatch = useDispatch<AppDispatch>();

  const courseList = useMemo(() => {
    // TODO: Fix
    return orderBy(Object.values(courses), ['courseId']);
  }, [courses]);

  const handleClick = (courseId: string) => {
    dispatch(setActiveLearnCourseId(courseId));
    dispatch(setActiveLearnPage(LearnPage.courseHome));
  };

  const renderCourseCards = () => {
    return courseList.map((course) => (
      <CourseCard course={course} key={course.courseId} onClick={() => handleClick(course.courseId)} />
    ));
  };

  const renderPageContent = () => {
    if (!!courseList.length) {
      return <CourseCardsContainer>{renderCourseCards()}</CourseCardsContainer>;
    }

    return (
      <EmptyPage
        bottomText="Courses that you take will appear here."
        graphic={MyCoursesEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default MyCourses;
