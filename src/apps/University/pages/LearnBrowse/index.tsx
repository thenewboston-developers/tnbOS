import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import orderBy from 'lodash/orderBy';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import {useAvailableCourses} from 'apps/University/hooks';
import {setActiveLearnCourseId, setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import EmptyPage from 'system/components/EmptyPage';
import {AppDispatch, SFC} from 'system/types';

import LearnBrowseEmptyStateGraphic from './assets/browse-empty-state.png';
import * as S from './Styles';

const LearnBrowse: SFC = ({className}) => {
  const availableCourses = useAvailableCourses();
  const dispatch = useDispatch<AppDispatch>();

  const courseList = useMemo(() => {
    return orderBy(availableCourses, ['modifiedDate'], ['desc']);
  }, [availableCourses]);

  const handleClick = (courseId: string) => {
    dispatch(setActiveLearnCourseId(courseId));
    dispatch(setActivePage(Page.learnCourseHome));
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
        bottomText="Courses from connected accounts will appear here."
        graphic={LearnBrowseEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default LearnBrowse;
