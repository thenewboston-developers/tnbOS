import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import TeachBreadcrumbs from 'apps/University/components/TeachBreadcrumbs';
import {getActivePage} from 'apps/University/selectors/state';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';
import * as S from './Styles';

const COURSE_LEFT_MENU_PAGES = [Page.teachCourseDetails, Page.teachCourseLectures];

export interface TeachDashboardProps {
  children: ReactNode;
}

const TeachDashboard: SFC<TeachDashboardProps> = ({children, className}) => {
  const activePage = useSelector(getActivePage);

  const renderLeftMenu = () => {
    if (COURSE_LEFT_MENU_PAGES.includes(activePage)) return <S.CourseLeftMenu />;
    return <S.LectureLeftMenu />;
  };

  return (
    <S.Container className={className}>
      {renderLeftMenu()}
      <S.Right>
        <TeachBreadcrumbs />
        {children}
      </S.Right>
    </S.Container>
  );
};

export default TeachDashboard;
