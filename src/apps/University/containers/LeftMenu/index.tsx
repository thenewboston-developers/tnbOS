import {mdiBookshelf, mdiMagnify, mdiSchool} from '@mdi/js';

import {Page} from 'apps/University/types';
import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const renderLearnMenu = () => (
    <>
      <S.MenuTitle>LEARN</S.MenuTitle>
      <MenuItem icon={mdiMagnify} page={Page.learnBrowse}>
        Browse
      </MenuItem>
      <MenuItem icon={mdiSchool} page={Page.learnMyCourses}>
        My Courses
      </MenuItem>
    </>
  );

  const renderTeachMenu = () => (
    <>
      <S.MenuTitle>TEACH</S.MenuTitle>
      <MenuItem icon={mdiBookshelf} page={Page.teachMyCourses}>
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
