import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiDelete, mdiPencil} from '@mdi/js';

import {setMessageBlock} from 'apps/Chat/blocks';
import AccountAttachment from 'apps/Chat/components/AccountAttachment';
import Avatar from 'apps/Chat/components/Avatar';
import DeliveryStatus from 'apps/Chat/components/DeliveryStatus';
import Tool from 'apps/Chat/components/Tool';
import Transfer from 'apps/Chat/containers/Right/Transfer';
import {useDeliveryStatus} from 'apps/Chat/hooks';
import EditMessageModal from 'apps/Chat/modals/EditMessageModal';
import {getActiveChat, getMessages} from 'apps/Chat/selectors/state';
import {setDelivery} from 'apps/Chat/store/deliveries';
import {setMessage} from 'apps/Chat/store/messages';
import {DeliveryStatus as TDeliveryStatus, Transfer as TTransfer} from 'apps/Chat/types';
import {useAccountDisplayImage, useAccountDisplayName, useRecipientsDefaultNetworkId, useToggle} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {Account, AppDispatch, Network, SFC} from 'system/types';
import {currentSystemDate, shortDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';
import * as S from './Styles';

export interface MessageProps {
  attachedAccounts: Account[];
  attachedNetworks: Network[];
  content: string;
  createdDate: string;
  isFirstUnreadMessage: boolean;
  messageId: string;
  modifiedDate: string;
  sender: string;
  transfer: TTransfer | null;
}

const Message: SFC<MessageProps> = ({
  attachedAccounts,
  attachedNetworks,
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

  const hasAttachments = !!attachedAccounts.length || !!attachedNetworks.length;
  const hasContent = !!content || !!transfer;
  const isMessageDeleted = !attachedAccounts.length && !attachedNetworks.length && !content && !transfer;

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
            status: TDeliveryStatus.pending,
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
    if (self.accountNumber !== sender || !hasContent) return;
    setToolsVisible(true);
  };

  const renderAttachments = () => {
    if (!hasAttachments) return null;

    const accountAttachments = attachedAccounts.map((attachedAccount) => (
      <AccountAttachment attachedAccount={attachedAccount} key={attachedAccount.accountNumber} />
    ));

    return <S.AttachmentContainer>{accountAttachments}</S.AttachmentContainer>;
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
          <DeliveryStatus deliveryStatus={deliveryStatus} />
        </S.HeaderRight>
      </S.Header>
    );
  };

  const renderMessageBody = () => {
    if (isMessageDeleted) return <S.ContentDeleted>This message has been deleted</S.ContentDeleted>;
    return (
      <>
        {content ? <S.Content>{content}</S.Content> : null}
        {transfer ? <Transfer amount={transfer.amount} networkId={transfer.networkId} /> : null}
      </>
    );
  };

  const renderModifiedDetails = () => {
    if (createdDate === modifiedDate) return null;
    const verb = isMessageDeleted ? 'deleted' : 'edited';
    return <S.ModifiedDetails>({verb})</S.ModifiedDetails>;
  };

  const renderNotificationLine = () => {
    if (!isFirstUnreadMessageSticky) return null;
    return <S.NotificationLine />;
  };

  const renderTools = () => {
    if (!toolsVisible) return null;
    return (
      <S.ToolsContainer>
        <S.Tools>
          <Tool icon={mdiPencil} onClick={toggleEditMessageModal} />
          <Tool icon={mdiDelete} onClick={handleDeleteClick} />
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
          {renderAttachments()}
        </S.Right>
      </S.Container>
      {renderEditMessageModal()}
    </>
  );
};

export default Message;
