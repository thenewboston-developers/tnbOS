import {SFC} from 'system/types';

import Breadcrumbs from './Breadcrumbs';
import CourseHome from './CourseHome';
import CourseLecture from './CourseLecture';
import Navigation from './Navigation';
import * as S from './Styles';

const Learn: SFC = ({className}) => {
  const renderMainContent = () => {
    return (
      <S.MainContent>
        <CourseHome />
        <CourseLecture />
      </S.MainContent>
    );
  };

  return (
    <S.Container className={className}>
      <Navigation />
      <Breadcrumbs />
      {renderMainContent()}
    </S.Container>
  );
};

export default Learn;
