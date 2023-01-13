import {useDispatch} from 'react-redux';

import {useActiveLearnCourse, useIsSelfEnrolled} from 'apps/University/hooks';
import {setEnrollment, unsetEnrollment} from 'apps/University/store/enrollments';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import * as S from './Styles';

const CourseHome: SFC = ({className}) => {
  const course = useActiveLearnCourse();
  const dispatch = useDispatch<AppDispatch>();
  const isSelfEnrolled = useIsSelfEnrolled(course?.courseId);

  const handleLeaveCourseClick = () => {
    dispatch(unsetEnrollment(course!.courseId));
  };

  const handleTakeCourseClick = () => {
    dispatch(
      setEnrollment({
        courseId: course!.courseId,
        enrollmentDate: currentSystemDate(),
      }),
    );
  };

  const renderButton = () => {
    if (isSelfEnrolled) return <button onClick={handleLeaveCourseClick}>Leave Course</button>;
    return <button onClick={handleTakeCourseClick}>Take Course</button>;
  };

  if (!course) return null;

  return (
    <S.Container className={className}>
      <div>
        <S.CourseName>{course.name}</S.CourseName>
        <S.Instructor accountNumber={course.instructor} />
        <S.CourseDescription>{course.description}</S.CourseDescription>
      </div>
      <div>
        <S.Thumbnail alt="thumbnail" src={course.thumbnailUrl} />
        {renderButton()}
      </div>
    </S.Container>
  );
};

export default CourseHome;
