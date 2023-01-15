import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiBookshelf, mdiPencil} from '@mdi/js';

import LeftMenuBack from 'apps/University/components/LeftMenuBack';
import LeftMenuSticker from 'apps/University/components/LeftMenuSticker';
import {useActiveTeachCourse} from 'apps/University/hooks';
import {getActivePage} from 'apps/University/selectors/state';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const CourseLeftMenu: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);
  const activeTeachCourse = useActiveTeachCourse();
  const dispatch = useDispatch<AppDispatch>();

  const isCollapsed = useMemo(() => {
    return activePage === Page.teachCourseLectureDetails;
  }, [activePage]);

  const handleLeftMenuBackClick = () => {
    dispatch(setActivePage(Page.teachMyCourses));
  };

  const renderLeftMenuBack = () => {
    if (!activeTeachCourse || isCollapsed) return null;

    return <LeftMenuBack onClick={handleLeftMenuBackClick}>My Courses</LeftMenuBack>;
  };

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
      {renderLeftMenuBack()}
      {renderLeftMenuSticker()}
      {renderMenu()}
    </S.Container>
  );
};

export default CourseLeftMenu;
