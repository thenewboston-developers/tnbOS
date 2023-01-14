import {useDispatch, useSelector} from 'react-redux';
import noop from 'lodash/noop';
import {mdiChevronRight} from '@mdi/js';
import Icon from '@mdi/react';

import {useActiveTeachCourse, useActiveTeachLecture} from 'apps/University/hooks';
import {getActiveTeachPage} from 'apps/University/selectors/state';
import {setActiveTeachPage} from 'apps/University/store/manager';
import {TeachPage} from 'apps/University/types';
import {GenericVoidFunction} from 'shared/types';
import {AppDispatch, Dict, SFC} from 'system/types';
import * as S from './Styles';

const TeachBreadcrumbs: SFC = ({className}) => {
  const activeTeachCourse = useActiveTeachCourse();
  const activeTeachLecture = useActiveTeachLecture();
  const activeTeachPage = useSelector(getActiveTeachPage);
  const dispatch = useDispatch<AppDispatch>();

  const handleCourseNameClick = () => {
    dispatch(setActiveTeachPage(TeachPage.courseDetails));
  };

  const handleLecturesClick = () => {
    dispatch(setActiveTeachPage(TeachPage.courseLectures));
  };

  const handleMyCoursesClick = () => {
    dispatch(setActiveTeachPage(TeachPage.myCourses));
  };

  const renderCourseName = () => {
    const activePages = [TeachPage.courseLectureDetails, TeachPage.courseLectures];
    const displayPages = [TeachPage.courseDetails, TeachPage.courseLectureDetails, TeachPage.courseLectures];

    if (!activeTeachCourse || !displayPages.includes(activeTeachPage)) return null;

    const isActive = activePages.includes(activeTeachPage);
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
    const activePages = [TeachPage.courseLectureDetails];
    const displayPages = [TeachPage.courseDetails, TeachPage.courseLectureDetails, TeachPage.courseLectures];

    if (!activeTeachCourse || !displayPages.includes(activeTeachPage)) return null;

    const clickHandlers: Dict<GenericVoidFunction> = {
      [TeachPage.courseDetails]: noop,
      [TeachPage.courseLectures]: noop,
      [TeachPage.courseLectureDetails]: handleLecturesClick,
    };
    const clickHandler = clickHandlers[activeTeachPage];

    const pageNames: Dict<string> = {
      [TeachPage.courseDetails]: 'Course Details',
      [TeachPage.courseLectures]: 'Lectures',
      [TeachPage.courseLectureDetails]: 'Lectures',
    };
    const pageName = pageNames[activeTeachPage];

    return (
      <>
        <Icon color="#999" path={mdiChevronRight} size="18px" />
        <S.Item isActive={activePages.includes(activeTeachPage)} onClick={clickHandler}>
          {pageName}
        </S.Item>
      </>
    );
  };

  const renderLectureName = () => {
    if (!activeTeachCourse || !activeTeachLecture || activeTeachPage !== TeachPage.courseLectureDetails) return null;
    return (
      <>
        <Icon color="#999" path={mdiChevronRight} size="18px" />
        <S.Item isActive={false}>{activeTeachLecture.name}</S.Item>
      </>
    );
  };

  return (
    <S.Container className={className}>
      <S.Item isActive={activeTeachPage !== TeachPage.myCourses} onClick={handleMyCoursesClick}>
        My Courses
      </S.Item>
      {renderCourseName()}
      {renderCoursePageName()}
      {renderLectureName()}
    </S.Container>
  );
};

export default TeachBreadcrumbs;