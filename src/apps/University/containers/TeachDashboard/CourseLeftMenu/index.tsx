import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {mdiBookshelf, mdiPencil} from '@mdi/js';

import LeftMenuSticker from 'apps/University/components/LeftMenuSticker';
import {useActiveTeachCourse} from 'apps/University/hooks';
import {getActivePage} from 'apps/University/selectors/state';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const CourseLeftMenu: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);
  const activeTeachCourse = useActiveTeachCourse();

  const isCollapsed = useMemo(() => {
    return activePage === Page.teachCourseLectureDetails;
  }, [activePage]);

  const renderLeftMenuSticker = () => {
    if (!activeTeachCourse || isCollapsed) return null;

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
        <MenuItem icon={mdiPencil} isCollapsed={isCollapsed} page={Page.teachCourseDetails}>
          Course Details
        </MenuItem>
        <MenuItem icon={mdiBookshelf} isCollapsed={isCollapsed} page={Page.teachCourseLectures}>
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
