import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiAlertCircleOutline, mdiCheck, mdiClockOutline, mdiDelete, mdiPencil} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Avatar from 'apps/Chat/components/Avatar';
import EditMessageModal from 'apps/Chat/modals/EditMessageModal';
import {deleteMessage} from 'apps/Chat/store/messages';
import {colors} from 'apps/Chat/styles';
import {DeliveryStatus} from 'apps/Chat/types';
import {shortDate} from 'apps/Chat/utils/dates';
import {useSafeDisplayImage, useSafeDisplayName, useToggle} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
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
  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useSafeDisplayImage(sender);
  const displayName = useSafeDisplayName(sender);
  const self = useSelector(getSelf);

  const isContentDeleted = !content;

  const handleDeleteClick = async () => {
    dispatch(
      deleteMessage({
        messageId,
        modifiedDate: currentSystemDate(),
      }),
    );
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

  const renderEditMessageModal = () => {
    if (!editMessageModalIsOpen) return null;
    return <EditMessageModal close={toggleEditMessageModal} content={content} messageId={messageId} />;
  };

  const renderHeader = () => {
    return (
      <S.Header>
        <S.HeaderLeft>
          <S.DisplayName>{displayName}</S.DisplayName>
          <S.Date>{shortDate(modifiedDate, true)}</S.Date>
          {renderModifiedDetails()}
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

  const renderModifiedDetails = () => {
    if (createdDate === modifiedDate) return null;
    const verb = isContentDeleted ? 'deleted' : 'edited';
    return <S.ModifiedDetails>({verb})</S.ModifiedDetails>;
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
        <Avatar displayImage={displayImage} />
        <S.Right>
          {renderHeader()}
          {renderMessageBody()}
        </S.Right>
      </S.Container>
      {renderEditMessageModal()}
    </>
  );
};

export default Message;
