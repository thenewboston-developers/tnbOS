import {useDispatch} from 'react-redux';

import LeftMenuBack from 'apps/University/components/LeftMenuBack';
import LeftMenuSticker from 'apps/University/components/LeftMenuSticker';
import {useActiveTeachLecture} from 'apps/University/hooks';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const LectureLeftMenu: SFC = ({className}) => {
  const activeTeachLecture = useActiveTeachLecture();
  const dispatch = useDispatch<AppDispatch>();

  const handleLeftMenuBackClick = () => {
    dispatch(setActivePage(Page.teachCourseLectureList));
  };

  const renderLeftMenuBack = () => {
    if (!activeTeachLecture) return null;
    return <LeftMenuBack onClick={handleLeftMenuBackClick}>Lectures</LeftMenuBack>;
  };

  const renderLeftMenuSticker = () => {
    if (!activeTeachLecture) return null;
    return (
      <LeftMenuSticker
        bottomText={activeTeachLecture.name}
        thumbnailUrl={activeTeachLecture.thumbnailUrl}
        topText="Your lecture"
      />
    );
  };

  return (
    <S.Container className={className}>
      {renderLeftMenuBack()}
      {renderLeftMenuSticker()}
    </S.Container>
  );
};

export default LectureLeftMenu;
