import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import {getCourses} from 'apps/University/selectors/state';
import EmptyPage from 'system/components/EmptyPage';
import {SFC} from 'system/types';

import BrowseEmptyStateGraphic from './assets/browse-empty-state.png';
import * as S from './Styles';

const Browse: SFC = ({className}) => {
  const courses = useSelector(getCourses);

  const courseList = useMemo(() => {
    return Object.values(courses);
  }, [courses]);

  const handleClick = (courseId: string) => {
    console.log(courseId);
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
        graphic={BrowseEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default Browse;
