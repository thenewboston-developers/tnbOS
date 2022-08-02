import {useSelector} from 'react-redux';

import DefaultAvatar from 'system/assets/default-avatar.png';
import {useToggle} from 'system/hooks';
import EditAccountModal from 'system/modals/EditAccountModal';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const Avatar: SFC = ({className}) => {
  const [editAccountModalIsOpen, toggleEditAccountModal] = useToggle(false);
  const self = useSelector(getSelf);

  return (
    <>
      <S.Img
        alt="avatar"
        className={className}
        onClick={toggleEditAccountModal}
        src={self.displayImage || DefaultAvatar}
      />
      {editAccountModalIsOpen ? <EditAccountModal close={toggleEditAccountModal} /> : null}
    </>
  );
};

export default Avatar;
