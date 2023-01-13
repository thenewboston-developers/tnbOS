import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import EmptyPage from 'system/components/EmptyPage';
import {SFC} from 'system/types';

import MyCoursesEmptyStateGraphic from './assets/my-courses-empty-state.png';
import * as S from './Styles';

const MyCourses: SFC = ({className}) => {
  const courses = [
    {
      courseId: 'def456',
      description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
      instructor: 'aaa7484c7c5f41901606631a771fcae7873cae2edac78c5597ba1472a1874dd6',
      name: 'Java Game Development',
      thumbnailUrl: 'https://i.imgur.com/tBMibH7.png',
    },
    {
      courseId: 'abc123',
      description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
      instructor: 'aaa7484c7c5f41901606631a771fcae7873cae2edac78c5597ba1472a1874dd6',
      name: 'Visual Basic',
      thumbnailUrl: 'https://i.imgur.com/8mRjXLF.png',
    },
  ];

  const handleClick = (courseId: string) => {
    console.log(courseId);
  };

  const renderCourseCards = () => {
    return courses.map((course) => (
      <CourseCard course={course} key={course.courseId} onClick={() => handleClick(course.courseId)} />
    ));
  };

  const renderPageContent = () => {
    if (!!courses.length) {
      return <CourseCardsContainer>{renderCourseCards()}</CourseCardsContainer>;
    }

    return (
      <EmptyPage
        bottomText="Courses from connected accounts will appear here."
        graphic={MyCoursesEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default MyCourses;
