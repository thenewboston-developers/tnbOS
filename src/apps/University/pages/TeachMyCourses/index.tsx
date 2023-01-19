import {useMemo} from 'react';

import Button from 'apps/University/components/Button';
import EmptyText from 'apps/University/components/EmptyText';
import {useTaughtCourses} from 'apps/University/hooks';
import CourseModal from 'apps/University/modals/CourseModal';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import Course from './Course';
import * as S from './Styles';

const TeachMyCourses: SFC = ({className}) => {
  const [courseModalIsOpen, toggleCourseModal] = useToggle(false);
  const taughtCourses = useTaughtCourses();

  const courses = useMemo(() => {
    return Object.values(taughtCourses);
  }, [taughtCourses]);

  const renderContent = () => {
    if (!!courses.length) return renderCourses();
    return <EmptyText>No courses to display.</EmptyText>;
  };

  const renderCourses = () => {
    const _courses = courses.map((course) => <Course course={course} key={course.courseId} />);
    return <S.Courses>{_courses}</S.Courses>;
  };

  const renderCourseModal = () => {
    if (!courseModalIsOpen) return null;
    return <CourseModal close={toggleCourseModal} />;
  };

  const renderNewCourseButton = () => {
    return <Button onClick={toggleCourseModal} text="New Course" />;
  };

  return (
    <>
      <S.Container className={className}>
        <S.SectionHeading heading="My Courses" rightContent={renderNewCourseButton()} />
        {renderContent()}
      </S.Container>
      {renderCourseModal()}
    </>
  );
};

export default TeachMyCourses;
