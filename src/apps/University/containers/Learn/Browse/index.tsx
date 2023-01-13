import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import EmptyPage from 'system/components/EmptyPage';
import {SFC} from 'system/types';

import BrowseEmptyStateGraphic from './assets/browse-empty-state.png';
import * as S from './Styles';

const Browse: SFC = ({className}) => {
  const courses = [
    {
      courseId: 'def456',
      description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
      instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
      name: 'Computer Game Development',
      thumbnailUrl: 'https://i.imgur.com/QkVxS3m.png',
    },
    {
      courseId: 'abc123',
      description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
      instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
      name: 'MySQL for Beginners',
      thumbnailUrl: 'https://i.imgur.com/R9jxXUj.png',
    },
    {
      courseId: 'def123',
      description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
      instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
      name: 'Objective C',
      thumbnailUrl: 'https://i.imgur.com/PSjlER4.png',
    },
    {
      courseId: 'abc456',
      description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
      instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
      name: 'Ruby',
      thumbnailUrl: 'https://i.imgur.com/4o8GWdj.png',
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
        graphic={BrowseEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default Browse;
