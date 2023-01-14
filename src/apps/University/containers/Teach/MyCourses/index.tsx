import {useTaughtCourses} from 'apps/University/hooks';
import {SFC} from 'system/types';

import Course from './Course';
import * as S from './Styles';

const MyCourses: SFC = ({className}) => {
  const taughtCourses = useTaughtCourses();

  const renderCourses = () => {
    const courses = Object.values(taughtCourses).map((course) => <Course course={course} key={course.courseId} />);
    return <S.Courses>{courses}</S.Courses>;
  };

  const renderNewCourseButton = () => {
    return <button>New Course</button>;
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="My Courses" rightContent={renderNewCourseButton()} />
      {renderCourses()}
    </S.Container>
  );
};

export default MyCourses;
