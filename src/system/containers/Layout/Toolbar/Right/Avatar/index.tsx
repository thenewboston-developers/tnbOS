import {useSelector} from 'react-redux';

import DefaultAvatar from 'system/assets/default-avatar.png';
import ToolbarItem from 'system/components/ToolbarItem';
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
      <ToolbarItem className={className}>
        <S.Img alt="avatar" onClick={toggleEditSelfModal} src={self.displayImage || DefaultAvatar} />
      </ToolbarItem>
      {editSelfModalIsOpen ? <EditSelfModal close={toggleEditSelfModal} /> : null}
    </>
  );
};

export default Avatar;
