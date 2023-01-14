import {mdiBookshelf, mdiMagnify, mdiSchool} from '@mdi/js';

import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const renderLearnMenu = () => (
    <>
      <S.MenuTitle>LEARN</S.MenuTitle>
      <MenuItem icon={mdiMagnify} isActivePage={true}>
        Browse
      </MenuItem>
      <MenuItem icon={mdiSchool} isActivePage={false}>
        My Courses
      </MenuItem>
    </>
  );

  const renderTeachMenu = () => (
    <>
      <S.MenuTitle>TEACH</S.MenuTitle>
      <MenuItem icon={mdiBookshelf} isActivePage={false}>
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
