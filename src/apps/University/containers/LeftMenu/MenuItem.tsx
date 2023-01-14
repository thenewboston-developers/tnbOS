import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeftMenuItem from 'apps/University/components/LeftMenuItem';
import {getActiveLearnCourseId, getActivePage, getEnrollments} from 'apps/University/selectors/state';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';

export interface MenuItemProps {
  children: string;
  icon: string;
  page: Page;
}

const MenuItem: SFC<MenuItemProps> = ({children, className, icon, page}) => {
  const activeLearnCourseId = useSelector(getActiveLearnCourseId);
  const activePage = useSelector(getActivePage);
  const dispatch = useDispatch<AppDispatch>();
  const enrollments = useSelector(getEnrollments);

  const isActivePage = useMemo(() => {
    if (page === activePage) return true;

    const isEnrolledInActiveLearnCourse = !!enrollments[activeLearnCourseId];

    if (page === Page.learnBrowse) {
      if (activePage === Page.learnCourseHome && !isEnrolledInActiveLearnCourse) return true;
      if (activePage === Page.learnCourseLecture && !isEnrolledInActiveLearnCourse) return true;
    }

    if (page === Page.learnMyCourses) {
      if (activePage === Page.learnCourseHome && isEnrolledInActiveLearnCourse) return true;
      if (activePage === Page.learnCourseLecture && isEnrolledInActiveLearnCourse) return true;
    }

    if (page === Page.teachMyCourses) {
      const teachPages = [Page.teachCourseDetails, Page.teachCourseLectureDetails, Page.teachCourseLectures];
      if (teachPages.includes(activePage)) return true;
    }

    return false;
  }, [activeLearnCourseId, activePage, enrollments, page]);

  const handleClick = () => {
    dispatch(setActivePage(page));
  };

  return (
    <LeftMenuItem className={className} icon={icon} isActivePage={isActivePage} onClick={handleClick}>
      {children}
    </LeftMenuItem>
  );

  // return (
  //   <S.Container $isActivePage={isActivePage} className={className} onClick={handleClick}>
  //     <S.Icon $isActivePage={isActivePage} path={icon} size="20px" />
  //     <S.Text $isActivePage={isActivePage}>{children}</S.Text>
  //   </S.Container>
  // );
};

export default MenuItem;
