import {useSelector} from 'react-redux';
import {mdiBookshelf, mdiPencil} from '@mdi/js';

import {useActiveTeachCourse} from 'apps/University/hooks';
import {getActivePage} from 'apps/University/selectors/state';
import {Page} from 'apps/University/types';
import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);
  const activeTeachCourse = useActiveTeachCourse();

  const renderCourseNameContainer = () => {
    const displayPages = [Page.teachCourseDetails, Page.teachCourseLectures];
    if (!activeTeachCourse || !displayPages.includes(activePage)) return null;
    return (
      <S.CourseNameContainer>
        <S.CourseNameLabel>Your course</S.CourseNameLabel>
        <S.CourseName>{activeTeachCourse.name}</S.CourseName>
      </S.CourseNameContainer>
    );
  };

  const renderMenuOptions = () => {
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

  const renderThumbnailContainer = () => {
    const displayPages = [Page.teachCourseDetails, Page.teachCourseLectures];
    if (!activeTeachCourse || !displayPages.includes(activePage)) return null;
    return (
      <S.ThumbnailContainer>
        <S.Thumbnail alt="thumbnail" src={activeTeachCourse.thumbnailUrl} />
      </S.ThumbnailContainer>
    );
  };

  return (
    <S.Container className={className}>
      {renderThumbnailContainer()}
      {renderCourseNameContainer()}
      {renderMenuOptions()}
    </S.Container>
  );
};

export default LeftMenu;
