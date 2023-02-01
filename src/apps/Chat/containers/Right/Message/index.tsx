import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiAlertCircleOutline, mdiCheck, mdiClockOutline, mdiDelete, mdiPencil} from '@mdi/js';
import MdiIcon from '@mdi/react';

import {setMessageBlock} from 'apps/Chat/blocks';
import Avatar from 'apps/Chat/components/Avatar';
import Transfer from 'apps/Chat/containers/Right/Transfer';
import {useDeliveryStatus} from 'apps/Chat/hooks';
import EditMessageModal from 'apps/Chat/modals/EditMessageModal';
import {getActiveChat, getMessages} from 'apps/Chat/selectors/state';
import {setDelivery} from 'apps/Chat/store/deliveries';
import {setMessage} from 'apps/Chat/store/messages';
import {colors} from 'apps/Chat/styles';
import {DeliveryStatus, Transfer as TTransfer} from 'apps/Chat/types';
import {useAccountDisplayImage, useAccountDisplayName, useRecipientsDefaultNetworkId, useToggle} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate, shortDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';
import * as S from './Styles';

export interface MessageProps {
  content: string;
  createdDate: string;
  isFirstUnreadMessage: boolean;
  messageId: string;
  modifiedDate: string;
  sender: string;
  transfer: TTransfer | null;
}

const Message: SFC<MessageProps> = ({
  className,
  content,
  createdDate,
  isFirstUnreadMessage,
  messageId,
  modifiedDate,
  sender,
  transfer,
}) => {
  const [editMessageModalIsOpen, toggleEditMessageModal] = useToggle(false);
  const [isFirstUnreadMessageSticky] = useState<boolean>(isFirstUnreadMessage);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const activeChat = useSelector(getActiveChat);
  const deliveryStatus = useDeliveryStatus(messageId);
  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useAccountDisplayImage(sender);
  const displayName = useAccountDisplayName(sender, 16);
  const messages = useSelector(getMessages);
  const recipientsDefaultNetworkId = useRecipientsDefaultNetworkId(activeChat!);
  const self = useSelector(getSelf);

  const isContentDeleted = !content && !transfer;

  const handleDeleteClick = async () => {
    try {
      const message = messages[messageId];
      const newMessage = {
        ...message,
        ...{
          content: '',
          modifiedDate: currentSystemDate(),
          transfer: null,
        },
      };

      if (recipientsDefaultNetworkId) {
        await setMessageBlock({
          amount: 0,
          networkId: recipientsDefaultNetworkId,
          params: newMessage,
          recipient: message.recipient,
        });
      }

      dispatch(setMessage(newMessage));

      dispatch(
        setDelivery({
          delivery: {
            attempts: 1,
            status: DeliveryStatus.pending,
          },
          messageId,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Error editing the message');
    }
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    if (self.accountNumber !== sender || isContentDeleted) return;
    setToolsVisible(true);
  };

  const renderDeliveryStatus = () => {
    if (!deliveryStatus) return null;

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

    const {color, path} = icons[deliveryStatus];
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
    return (
      <>
        {content ? <S.Content>{content}</S.Content> : null}
        {transfer ? <Transfer amount={transfer.amount} networkId={transfer.networkId} /> : null}
      </>
    );
  };

  const renderModifiedDetails = () => {
    if (createdDate === modifiedDate) return null;
    const verb = isContentDeleted ? 'deleted' : 'edited';
    return <S.ModifiedDetails>({verb})</S.ModifiedDetails>;
  };

  const renderNotificationLine = () => {
    if (!isFirstUnreadMessageSticky) return null;
    return <S.NotificationLine />;
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
      {renderNotificationLine()}
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
