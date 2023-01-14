import {mdiBookshelf, mdiPencil} from '@mdi/js';

import LeftMenuSticker from 'apps/University/components/LeftMenuSticker';
import {useActiveTeachCourse} from 'apps/University/hooks';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const CourseLeftMenu: SFC = ({className}) => {
  const activeTeachCourse = useActiveTeachCourse();

  const renderLeftMenuSticker = () => {
    if (!activeTeachCourse) return null;

    return (
      <LeftMenuSticker
        bottomText={activeTeachCourse.name}
        thumbnailUrl={activeTeachCourse.thumbnailUrl}
        topText="Your course"
      />
    );
  };

  const renderMenu = () => {
    return (
      <S.Menu>
        <MenuItem icon={mdiPencil} page={Page.teachCourseDetails}>
          Course Details
        </MenuItem>
        <MenuItem icon={mdiBookshelf} page={Page.teachCourseLectures}>
          Lectures
        </MenuItem>
      </S.Menu>
    );
  };

  return (
    <S.Container className={className}>
      {renderLeftMenuSticker()}
      {renderMenu()}
    </S.Container>
  );
};

export default CourseLeftMenu;
