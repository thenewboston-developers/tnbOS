import {ChangeEvent, useMemo, useState} from 'react';
import orderBy from 'lodash/orderBy';

import Button from 'apps/University/components/Button';
import EmptyText from 'apps/University/components/EmptyText';
import Search from 'apps/University/components/Search';
import {useTaughtCourses} from 'apps/University/hooks';
import CourseModal from 'apps/University/modals/CourseModal';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import Course from './Course';
import * as S from './Styles';

const TeachMyCourses: SFC = ({className}) => {
  const [courseModalIsOpen, toggleCourseModal] = useToggle(false);
  const [searchText, setSearchText] = useState<string>('');
  const taughtCourses = useTaughtCourses();

  const courseList = useMemo(() => {
    let results = taughtCourses;

    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();

      results = results.filter(({description, name}) => {
        return (
          description.toLowerCase().includes(lowerCaseSearchText) || name.toLowerCase().includes(lowerCaseSearchText)
        );
      });
    }

    return orderBy(results, ['modifiedDate'], ['desc']);
  }, [searchText, taughtCourses]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const renderCourses = () => {
    const _courses = courseList.map((course) => <Course course={course} key={course.courseId} />);
    return <S.Courses>{_courses}</S.Courses>;
  };

  const renderCourseModal = () => {
    if (!courseModalIsOpen) return null;
    return <CourseModal close={toggleCourseModal} />;
  };

  const renderNewCourseButton = () => {
    return <Button onClick={toggleCourseModal} text="New Course" />;
  };

  const renderPageContent = () => {
    if (!!courseList.length) return renderCourses();
    return <EmptyText>No courses to display.</EmptyText>;
  };

  return (
    <>
      <S.Container className={className}>
        <Search onChange={handleInputChange} />
        <S.PageContent>
          <S.SectionHeading heading="My Courses" rightContent={renderNewCourseButton()} />
          {renderPageContent()}
        </S.PageContent>
      </S.Container>
      {renderCourseModal()}
    </>
  );
};

export default TeachMyCourses;
