import {useSelector} from 'react-redux';

import DefaultAvatar from 'system/assets/default-avatar.png';
import {useToggle} from 'system/hooks';
import EditSelfModal from 'system/modals/EditSelfModal';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const Avatar: SFC = ({className}) => {
  const [editSelfModalIsOpen, toggleEditSelfModal] = useToggle(false);
  const self = useSelector(getSelf);

  return (
    <>
      <S.Img
        alt="avatar"
        className={className}
        onClick={toggleEditSelfModal}
        src={self.displayImage || DefaultAvatar}
      />
      {editSelfModalIsOpen ? <EditSelfModal close={toggleEditSelfModal} /> : null}
    </>
  );
};

export default Avatar;
