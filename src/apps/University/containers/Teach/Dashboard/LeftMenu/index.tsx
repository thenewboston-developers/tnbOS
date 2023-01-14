import {useSelector} from 'react-redux';
import {mdiBookshelf, mdiPencil} from '@mdi/js';

import {useActiveTeachCourse} from 'apps/University/hooks';
import {getActiveTeachPage} from 'apps/University/selectors/state';
import {TeachPage} from 'apps/University/types';
import {SFC} from 'system/types';

import MenuItem from './MenuItem';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const activeTeachCourse = useActiveTeachCourse();
  const activeTeachPage = useSelector(getActiveTeachPage);

  const renderCourseNameContainer = () => {
    const displayPages = [TeachPage.courseDetails, TeachPage.courseLectures];
    if (!activeTeachCourse || !displayPages.includes(activeTeachPage)) return null;
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
        <MenuItem icon={mdiPencil} page={TeachPage.courseDetails} text="Course Details" />
        <MenuItem icon={mdiBookshelf} page={TeachPage.courseLectures} text="Lectures" />
      </S.Menu>
    );
  };

  const renderThumbnailContainer = () => {
    const displayPages = [TeachPage.courseDetails, TeachPage.courseLectures];
    if (!activeTeachCourse || !displayPages.includes(activeTeachPage)) return null;
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
