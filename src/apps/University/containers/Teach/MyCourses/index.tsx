import {useTaughtCourses} from 'apps/University/hooks';
import CourseModal from 'apps/University/modals/CourseModal';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import Course from './Course';
import * as S from './Styles';

const MyCourses: SFC = ({className}) => {
  const [courseModalIsOpen, toggleCourseModal] = useToggle(false);
  const taughtCourses = useTaughtCourses();

  const renderCourses = () => {
    const courses = Object.values(taughtCourses).map((course) => <Course course={course} key={course.courseId} />);
    return <S.Courses>{courses}</S.Courses>;
  };

  const renderCourseModal = () => {
    if (!courseModalIsOpen) return null;
    return <CourseModal close={toggleCourseModal} />;
  };

  const renderNewCourseButton = () => {
    return <button onClick={toggleCourseModal}>New Course</button>;
  };

  return (
    <>
      <S.Container className={className}>
        <S.SectionHeading heading="My Courses" rightContent={renderNewCourseButton()} />
        {renderCourses()}
      </S.Container>
      {renderCourseModal()}
    </>
  );
};

export default MyCourses;
