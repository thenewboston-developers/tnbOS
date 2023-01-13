import {useDispatch} from 'react-redux';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import {useAvailableCourses} from 'apps/University/hooks';
import {setActiveLearnCourseId, setActiveLearnPage} from 'apps/University/store/manager';
import {LearnPage} from 'apps/University/types';
import EmptyPage from 'system/components/EmptyPage';
import {AppDispatch, SFC} from 'system/types';

import BrowseEmptyStateGraphic from './assets/browse-empty-state.png';
import * as S from './Styles';

const Browse: SFC = ({className}) => {
  const availableCourses = useAvailableCourses();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (courseId: string) => {
    dispatch(setActiveLearnCourseId(courseId));
    dispatch(setActiveLearnPage(LearnPage.courseHome));
  };

  const renderCourseCards = () => {
    return availableCourses.map((course) => (
      <CourseCard course={course} key={course.courseId} onClick={() => handleClick(course.courseId)} />
    ));
  };

  const renderPageContent = () => {
    if (!!availableCourses.length) {
      return <CourseCardsContainer>{renderCourseCards()}</CourseCardsContainer>;
    }

    return (
      <EmptyPage
        bottomText="Courses from connected accounts will appear here."
        graphic={BrowseEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default Browse;
