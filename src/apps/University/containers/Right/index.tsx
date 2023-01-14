import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import LearnBrowse from 'apps/University/pages/LearnBrowse';
import LearnCourseHome from 'apps/University/pages/LearnCourseHome';
import LearnCourseLecture from 'apps/University/pages/LearnCourseLecture';
import LearnMyCourses from 'apps/University/pages/LearnMyCourses';
import TeachCourseDetails from 'apps/University/pages/TeachCourseDetails';
import TeachCourseLectureDetails from 'apps/University/pages/TeachCourseLectureDetails';
import TeachCourseLectures from 'apps/University/pages/TeachCourseLectures';
import TeachMyCourses from 'apps/University/pages/TeachMyCourses';
import {getActivePage} from 'apps/University/selectors/state';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';
import * as S from './Styles';

type PageDict = {
  [key in Page]: ReactNode;
};

const Right: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);

  const renderActivePage = () => {
    const pages: PageDict = {
      [Page.learnBrowse]: <LearnBrowse />,
      [Page.learnCourseHome]: <LearnCourseHome />,
      [Page.learnCourseLecture]: <LearnCourseLecture />,
      [Page.learnMyCourses]: <LearnMyCourses />,
      [Page.teachCourseDetails]: <TeachCourseDetails />,
      [Page.teachCourseLectureDetails]: <TeachCourseLectureDetails />,
      [Page.teachCourseLectures]: <TeachCourseLectures />,
      [Page.teachMyCourses]: <TeachMyCourses />,
    };

    return pages[activePage];
  };

  return (
    <S.Container className={className}>
      <S.MainContent>{renderActivePage()}</S.MainContent>
    </S.Container>
  );
};

export default Right;
