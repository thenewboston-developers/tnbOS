import {useDispatch} from 'react-redux';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import {useEnrolledCourses} from 'apps/University/hooks';
import {setActiveLearnCourseId, setActiveLearnPage} from 'apps/University/store/manager';
import {LearnPage} from 'apps/University/types';
import EmptyPage from 'system/components/EmptyPage';
import {AppDispatch, SFC} from 'system/types';

import MyCoursesEmptyStateGraphic from './assets/my-courses-empty-state.png';
import * as S from './Styles';

const MyCourses: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const enrolledCourses = useEnrolledCourses();

  const handleClick = (courseId: string) => {
    dispatch(setActiveLearnCourseId(courseId));
    dispatch(setActiveLearnPage(LearnPage.courseHome));
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
        graphic={MyCoursesEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default MyCourses;
