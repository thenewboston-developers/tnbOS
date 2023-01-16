import {useDispatch, useSelector} from 'react-redux';
import noop from 'lodash/noop';
import {mdiChevronRight} from '@mdi/js';
import Icon from '@mdi/react';

import BreadcrumbItem from 'apps/University/components/BreadcrumbItem';
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
    dispatch(setActivePage(Page.teachCourseLectureList));
  };

  const handleMyCoursesClick = () => {
    dispatch(setActivePage(Page.teachMyCourses));
  };

  const renderCourseName = () => {
    const activePages = [Page.teachCourseLectureDetails, Page.teachCourseLectureList, Page.teachCourseLectureSorting];
    const displayPages = [
      Page.teachCourseDetails,
      Page.teachCourseLectureDetails,
      Page.teachCourseLectureList,
      Page.teachCourseLectureSorting,
    ];

    if (!activeTeachCourse || !displayPages.includes(activePage)) return null;

    const isActive = activePages.includes(activePage);
    const clickHandler = isActive ? handleCourseNameClick : noop;

    return (
      <>
        <Icon color="#ccc" path={mdiChevronRight} size="18px" />
        <BreadcrumbItem isActive={isActive} onClick={clickHandler}>
          {activeTeachCourse.name}
        </BreadcrumbItem>
      </>
    );
  };

  const renderCoursePageName = () => {
    const activePages = [Page.teachCourseLectureDetails];
    const displayPages = [
      Page.teachCourseDetails,
      Page.teachCourseLectureDetails,
      Page.teachCourseLectureList,
      Page.teachCourseLectureSorting,
    ];

    if (!activeTeachCourse || !displayPages.includes(activePage)) return null;

    const clickHandlers: Dict<GenericVoidFunction> = {
      [Page.teachCourseDetails]: noop,
      [Page.teachCourseLectureDetails]: handleLecturesClick,
      [Page.teachCourseLectureList]: noop,
      [Page.teachCourseLectureSorting]: noop,
    };
    const clickHandler = clickHandlers[activePage];

    const pageNames: Dict<string> = {
      [Page.teachCourseDetails]: 'Course Details',
      [Page.teachCourseLectureDetails]: 'Lectures',
      [Page.teachCourseLectureList]: 'Lectures',
      [Page.teachCourseLectureSorting]: 'Lecture Sorting',
    };
    const pageName = pageNames[activePage];

    return (
      <>
        <Icon color="#ccc" path={mdiChevronRight} size="18px" />
        <BreadcrumbItem isActive={activePages.includes(activePage)} onClick={clickHandler}>
          {pageName}
        </BreadcrumbItem>
      </>
    );
  };

  const renderLectureName = () => {
    if (!activeTeachCourse || !activeTeachLecture || activePage !== Page.teachCourseLectureDetails) return null;
    return (
      <>
        <Icon color="#ccc" path={mdiChevronRight} size="18px" />
        <BreadcrumbItem isActive={false}>{activeTeachLecture.name}</BreadcrumbItem>
      </>
    );
  };

  return (
    <S.Container className={className}>
      <BreadcrumbItem isActive={activePage !== Page.teachMyCourses} onClick={handleMyCoursesClick}>
        My Courses
      </BreadcrumbItem>
      {renderCourseName()}
      {renderCoursePageName()}
      {renderLectureName()}
    </S.Container>
  );
};

export default TeachBreadcrumbs;
