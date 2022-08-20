import {useState} from 'react';
import {useSelector} from 'react-redux';
import {mdiAlertCircleOutline, mdiCheck, mdiClockOutline, mdiDelete, mdiPencil} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Avatar from 'apps/Chat/components/Avatar';
import EditMessageModal from 'apps/Chat/modals/EditMessageModal';
import {colors} from 'apps/Chat/styles';
import {DeliveryStatus} from 'apps/Chat/types';
import {shortDate} from 'apps/Chat/utils/dates';
import {useToggle} from 'system/hooks';
import {getAccounts, getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import {safeDisplayName} from 'system/utils/accounts';
import * as S from './Styles';

export interface MessageProps {
  content: string;
  createdDate: string;
  messageId: string;
  modifiedDate: string;
  sender: string;
}

const Message: SFC<MessageProps> = ({className, content, createdDate, messageId, modifiedDate, sender}) => {
  const [editMessageModalIsOpen, toggleEditMessageModal] = useToggle(false);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const accounts = useSelector(getAccounts);
  const self = useSelector(getSelf);

  const isContentDeleted = !content;

  const handleDeleteClick = async () => {
    console.log(messageId);
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    if (self.accountNumber !== sender || isContentDeleted) return;
    setToolsVisible(true);
  };

  const renderDeliveryStatus = () => {
    if (self.accountNumber !== sender) return null;

    const icons = {
      [DeliveryStatus.error]: {
        color: colors.palette.red['300'],
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.failed]: {
        color: colors.palette.orange['300'],
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.pending]: {
        color: colors.palette.gray['300'],
        path: mdiClockOutline,
      },
      [DeliveryStatus.received]: {
        color: colors.palette.green['300'],
        path: mdiCheck,
      },
    };

    const {color, path} = icons[DeliveryStatus.received];
    return <MdiIcon color={color} path={path} size="14px" />;
  };

  const renderEdited = () => {
    if (createdDate === modifiedDate) return null;
    return <S.Edited>(edited)</S.Edited>;
  };

  const renderHeader = () => {
    return (
      <S.Header>
        <S.HeaderLeft>
          <S.DisplayName>{safeDisplayName(sender, accounts)}</S.DisplayName>
          <S.Date>{shortDate(modifiedDate, true)}</S.Date>
          {renderEdited()}
        </S.HeaderLeft>
        <S.HeaderRight>
          {renderTools()}
          {renderDeliveryStatus()}
        </S.HeaderRight>
      </S.Header>
    );
  };

  const renderMessageBody = () => {
    if (isContentDeleted) return <S.ContentDeleted>This message has been deleted</S.ContentDeleted>;
    return <S.Content>{content}</S.Content>;
  };

  const renderTools = () => {
    return (
      <S.ToolsContainer>
        <S.Tools $display={toolsVisible}>
          <S.Tool icon={mdiPencil} onClick={toggleEditMessageModal} size={20} totalSize="unset" unfocusable />
          <S.Tool icon={mdiDelete} onClick={handleDeleteClick} size={20} totalSize="unset" unfocusable />
        </S.Tools>
      </S.ToolsContainer>
    );
  };

  return (
    <>
      <S.Container className={className} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
        <Avatar displayImage="https://avatars.githubusercontent.com/u/8547538?v=4" />
        <S.Right>
          {renderHeader()}
          {renderMessageBody()}
        </S.Right>
      </S.Container>
      {editMessageModalIsOpen ? <EditMessageModal close={toggleEditMessageModal} /> : null}
    </>
  );
};

export default Message;
