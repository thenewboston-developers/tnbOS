import {useSelector} from 'react-redux';

import {getCourses} from 'apps/University/selectors/state';
import {SFC} from 'system/types';

import Course from './Course';
import * as S from './Styles';

const MyCourses: SFC = ({className}) => {
  const courses = useSelector(getCourses);

  const renderCourses = () => {
    const _courses = Object.values(courses).map((course) => <Course course={course} key={course.courseId} />);
    return <S.Courses>{_courses}</S.Courses>;
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
