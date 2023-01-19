import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {mdiFoodApple, mdiMagnify, mdiSchool} from '@mdi/js';

import LeftMenuTitle from 'apps/University/components/LeftMenuTitle';
import {getActivePage} from 'apps/University/selectors/state';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);

  const isCollapsed = useMemo(() => {
    const collapsedPages = [
      Page.teachCourseDetails,
      Page.teachCourseLectureDetails,
      Page.teachCourseLectureList,
      Page.teachCourseLectureSorting,
    ];
    return collapsedPages.includes(activePage);
  }, [activePage]);

  const renderLearnMenu = () => (
    <>
      <LeftMenuTitle isCollapsed={isCollapsed}>LEARN</LeftMenuTitle>
      <MenuItem icon={mdiMagnify} isCollapsed={isCollapsed} page={Page.learnBrowse}>
        Browse
      </MenuItem>
      <MenuItem icon={mdiSchool} isCollapsed={isCollapsed} page={Page.learnMyCourses}>
        My Courses
      </MenuItem>
    </>
  );

  const renderTeachMenu = () => (
    <>
      <LeftMenuTitle isCollapsed={isCollapsed}>TEACH</LeftMenuTitle>
      <MenuItem icon={mdiFoodApple} isCollapsed={isCollapsed} page={Page.teachMyCourses}>
        My Courses
      </MenuItem>
    </>
  );

  return (
    <S.Container className={className}>
      {renderLearnMenu()}
      {renderTeachMenu()}
    </S.Container>
  );
};

export default LeftMenu;
