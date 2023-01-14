import {useDispatch, useSelector} from 'react-redux';

import {useActiveTeachCourse} from 'apps/University/hooks';
import {getActiveTeachPage} from 'apps/University/selectors/state';
import {setActiveTeachPage} from 'apps/University/store/manager';
import {TeachPage} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const activeTeachCourse = useActiveTeachCourse();
  const activeTeachPage = useSelector(getActiveTeachPage);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuOptionClick = (page: TeachPage) => {
    dispatch(setActiveTeachPage(page));
  };

  const renderCourseName = () => {
    const displayPages = [TeachPage.courseDetails, TeachPage.courseLectures];
    if (!activeTeachCourse || !displayPages.includes(activeTeachPage)) return null;
    return (
      <>
        <S.NameLabel>Your course</S.NameLabel>
        <S.Name>{activeTeachCourse.name}</S.Name>
      </>
    );
  };

  const renderCourseThumbnail = () => {
    const displayPages = [TeachPage.courseDetails, TeachPage.courseLectures];
    if (!activeTeachCourse || !displayPages.includes(activeTeachPage)) return null;
    return <S.Thumbnail alt="thumbnail" src={activeTeachCourse.thumbnailUrl} />;
  };

  const renderMenuOptions = () => {
    return (
      <S.Menu>
        <S.MenuOption
          isActive={activeTeachPage === TeachPage.courseDetails}
          onClick={() => handleMenuOptionClick(TeachPage.courseDetails)}
        >
          Course Details
        </S.MenuOption>
        <S.MenuOption
          isActive={activeTeachPage === TeachPage.courseLectures}
          onClick={() => handleMenuOptionClick(TeachPage.courseLectures)}
        >
          Lectures
        </S.MenuOption>
      </S.Menu>
    );
  };

  return (
    <S.Container className={className}>
      {renderCourseThumbnail()}
      {renderCourseName()}
      {renderMenuOptions()}
    </S.Container>
  );
};

export default LeftMenu;
