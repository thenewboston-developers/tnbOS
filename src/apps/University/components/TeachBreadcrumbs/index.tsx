import {useDispatch, useSelector} from 'react-redux';
import noop from 'lodash/noop';
import {mdiChevronRight} from '@mdi/js';
import Icon from '@mdi/react';

import {useActiveTeachCourse, useActiveTeachLecture} from 'apps/University/hooks';
import {getActivePage} from 'apps/University/selectors/state';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {GenericVoidFunction} from 'shared/types';
import {AppDispatch, Dict, SFC} from 'system/types';
import * as S from './Styles';

const TeachBreadcrumbs: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);
  const activeTeachCourse = useActiveTeachCourse();
  const activeTeachLecture = useActiveTeachLecture();
  const dispatch = useDispatch<AppDispatch>();

  const handleCourseNameClick = () => {
    dispatch(setActivePage(Page.teachCourseDetails));
  };

  const handleLecturesClick = () => {
    dispatch(setActivePage(Page.teachCourseLectures));
  };

  const handleMyCoursesClick = () => {
    dispatch(setActivePage(Page.teachMyCourses));
  };

  const renderCourseName = () => {
    const activePages = [Page.teachCourseLectureDetails, Page.teachCourseLectures];
    const displayPages = [Page.teachCourseDetails, Page.teachCourseLectureDetails, Page.teachCourseLectures];

    if (!activeTeachCourse || !displayPages.includes(activePage)) return null;

    const isActive = activePages.includes(activePage);
    const clickHandler = isActive ? handleCourseNameClick : noop;

    return (
      <>
        <Icon color="#999" path={mdiChevronRight} size="18px" />
        <S.Item isActive={isActive} onClick={clickHandler}>
          {activeTeachCourse.name}
        </S.Item>
      </>
    );
  };

  const renderCoursePageName = () => {
    const activePages = [Page.teachCourseLectureDetails];
    const displayPages = [Page.teachCourseDetails, Page.teachCourseLectureDetails, Page.teachCourseLectures];

    if (!activeTeachCourse || !displayPages.includes(activePage)) return null;

    const clickHandlers: Dict<GenericVoidFunction> = {
      [Page.teachCourseDetails]: noop,
      [Page.teachCourseLectures]: noop,
      [Page.teachCourseLectureDetails]: handleLecturesClick,
    };
    const clickHandler = clickHandlers[activePage];

    const pageNames: Dict<string> = {
      [Page.teachCourseDetails]: 'Course Details',
      [Page.teachCourseLectures]: 'Lectures',
      [Page.teachCourseLectureDetails]: 'Lectures',
    };
    const pageName = pageNames[activePage];

    return (
      <>
        <Icon color="#999" path={mdiChevronRight} size="18px" />
        <S.Item isActive={activePages.includes(activePage)} onClick={clickHandler}>
          {pageName}
        </S.Item>
      </>
    );
  };

  const renderLectureName = () => {
    if (!activeTeachCourse || !activeTeachLecture || activePage !== Page.teachCourseLectureDetails) return null;
    return (
      <>
        <Icon color="#999" path={mdiChevronRight} size="18px" />
        <S.Item isActive={false}>{activeTeachLecture.name}</S.Item>
      </>
    );
  };

  return (
    <S.Container className={className}>
      <S.Item isActive={activePage !== Page.teachMyCourses} onClick={handleMyCoursesClick}>
        My Courses
      </S.Item>
      {renderCourseName()}
      {renderCoursePageName()}
      {renderLectureName()}
    </S.Container>
  );
};

export default TeachBreadcrumbs;
