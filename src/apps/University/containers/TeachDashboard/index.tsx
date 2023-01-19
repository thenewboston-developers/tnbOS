import {ReactNode, useMemo} from 'react';
import {useSelector} from 'react-redux';

import TeachBreadcrumbs from 'apps/University/components/TeachBreadcrumbs';
import {getActivePage} from 'apps/University/selectors/state';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';
import * as S from './Styles';

const COURSE_LEFT_MENU_PAGES = [
  Page.teachCourseDetails,
  Page.teachCourseLectureDetails,
  Page.teachCourseLectureList,
  Page.teachCourseLectureSorting,
];
const LECTURE_LEFT_MENU_PAGES = [Page.teachCourseLectureDetails];

export interface TeachDashboardProps {
  children: ReactNode;
}

const TeachDashboard: SFC<TeachDashboardProps> = ({children, className}) => {
  const activePage = useSelector(getActivePage);

  const isLectureLeftMenuVisible = useMemo(() => {
    return LECTURE_LEFT_MENU_PAGES.includes(activePage);
  }, [activePage]);

  const renderCourseLeftMenu = () => {
    if (!COURSE_LEFT_MENU_PAGES.includes(activePage)) return null;
    return <S.CourseLeftMenu />;
  };

  const renderLectureLeftMenu = () => {
    if (!isLectureLeftMenuVisible) return null;
    return <S.LectureLeftMenu />;
  };

  return (
    <S.Container className={className} isLectureLeftMenuVisible={isLectureLeftMenuVisible}>
      {renderCourseLeftMenu()}
      {renderLectureLeftMenu()}
      <S.Right isLectureLeftMenuVisible={isLectureLeftMenuVisible}>
        <TeachBreadcrumbs />
        {children}
      </S.Right>
    </S.Container>
  );
};

export default TeachDashboard;
