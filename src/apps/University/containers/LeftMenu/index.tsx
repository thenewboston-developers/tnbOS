import {mdiBookshelf, mdiMagnify, mdiSchool} from '@mdi/js';

import LeftMenuTitle from 'apps/University/components/LeftMenuTitle';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const renderLearnMenu = () => (
    <>
      <LeftMenuTitle>LEARN</LeftMenuTitle>
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
      <LeftMenuTitle>TEACH</LeftMenuTitle>
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
