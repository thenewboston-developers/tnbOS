import {useDispatch} from 'react-redux';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import {useEnrolledCourses} from 'apps/University/hooks';
import {setActiveLearnCourseId, setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import EmptyPage from 'system/components/EmptyPage';
import {AppDispatch, SFC} from 'system/types';

import LearnMyCoursesEmptyStateGraphic from './assets/my-courses-empty-state.png';
import * as S from './Styles';

const LearnMyCourses: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const enrolledCourses = useEnrolledCourses();

  const handleClick = (courseId: string) => {
    dispatch(setActiveLearnCourseId(courseId));
    dispatch(setActivePage(Page.learnCourseHome));
  };

  const renderCourseCards = () => {
    return enrolledCourses.map((course) => (
      <CourseCard course={course} key={course.courseId} onClick={() => handleClick(course.courseId)} />
    ));
  };

  const renderPageContent = () => {
    if (!!enrolledCourses.length) {
      return <CourseCardsContainer>{renderCourseCards()}</CourseCardsContainer>;
    }

    return (
      <EmptyPage
        bottomText="Courses that you take will appear here."
        graphic={LearnMyCoursesEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default LearnMyCourses;
