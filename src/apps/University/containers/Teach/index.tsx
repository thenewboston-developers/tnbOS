import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import TeachBreadcrumbs from 'apps/University/components/TeachBreadcrumbs';
import {getActiveTeachPage} from 'apps/University/selectors/state';
import {TeachPage} from 'apps/University/types';
import {SFC} from 'system/types';

import CourseDetails from './CourseDetails';
import CourseLectureDetails from './CourseLectureDetails';
import CourseLectures from './CourseLectures';
import MyCourses from './MyCourses';
import * as S from './Styles';

type TeachPageDict = {
  [key in TeachPage]: ReactNode;
};

const Teach: SFC = ({className}) => {
  const activeTeachPage = useSelector(getActiveTeachPage);

  const renderActiveTeachPage = () => {
    const teachPages: TeachPageDict = {
      [TeachPage.courseDetails]: <CourseDetails />,
      [TeachPage.courseLectureDetails]: <CourseLectureDetails />,
      [TeachPage.courseLectures]: <CourseLectures />,
      [TeachPage.myCourses]: <MyCourses />,
    };

    return teachPages[activeTeachPage];
  };

  const renderBreadcrumbs = () => {
    if (activeTeachPage === TeachPage.myCourses) return null;
    return <TeachBreadcrumbs />;
  };

  return (
    <S.Container className={className}>
      {renderBreadcrumbs()}
      {renderActiveTeachPage()}
    </S.Container>
  );
};

export default Teach;
