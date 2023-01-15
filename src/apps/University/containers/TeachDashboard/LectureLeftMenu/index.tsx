import LeftMenuSticker from 'apps/University/components/LeftMenuSticker';
import {useActiveTeachLecture} from 'apps/University/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const LectureLeftMenu: SFC = ({className}) => {
  const activeTeachLecture = useActiveTeachLecture();

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
      {renderLeftMenuSticker()}
    </S.Container>
  );
};

export default LectureLeftMenu;