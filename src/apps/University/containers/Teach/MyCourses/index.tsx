import {useSelector} from 'react-redux';

import {getCourses} from 'apps/University/selectors/state';
import {SFC} from 'system/types';

import Course from './Course';
import * as S from './Styles';

const MyCourses: SFC = ({className}) => {
  const courses = useSelector(getCourses);

  const renderCourses = () => {
    return Object.values(courses).map((course) => <Course course={course} key={course.courseId} />);
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="My Courses" />
      {renderCourses()}
    </S.Container>
  );
};

export default MyCourses;
