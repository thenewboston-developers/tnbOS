import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiAlertCircleOutline, mdiCheck, mdiClockOutline, mdiDelete, mdiPencil} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Transfer from 'apps/Chat/containers/Right/Transfer';
import EditMessageModal from 'apps/Chat/modals/EditMessageModal';
import {getChatMessages} from 'apps/Chat/selectors/state';
import {deleteMessage, updateDeliveryData} from 'apps/Chat/store/chat';
import {DeliveryStatus, MessageSystem, Transfer as TTransfer} from 'apps/Chat/types';
import {sendMessage} from 'apps/Chat/utils/messages';
import UserAvatar from 'renderer/components/UserAvatar';
import {useAddress, useSelfAccountNumber, useToggle} from 'renderer/hooks';
import {getAccounts, getSelf} from 'renderer/selectors/state';
import {colors} from 'renderer/styles';
import {currentDate, formattedDate} from 'renderer/utils/dates';
import {displayErrorToast} from 'renderer/utils/toast';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

export interface MessageProps {
  content: string | null;
  createdDate: string;
  id: string;
  modifiedDate: string;
  sender: string;
  system?: MessageSystem;
  transfer: TTransfer | null;
}

const Message: SFC<MessageProps> = ({className, content, createdDate, id, modifiedDate, sender, system, transfer}) => {
  const [editMessageModalIsOpen, toggleEditMessageModal] = useToggle(false);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const accounts = useSelector(getAccounts);
  const account = accounts[sender];
  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(getChatMessages);
  const self = useSelector(getSelf);
  const selfAccountNumber = useSelfAccountNumber();

  const isContentDeleted = !content && !transfer;

  const handleDeleteClick = async () => {
    try {
      const now = currentDate();
      dispatch(deleteMessage({id, modifiedDate: now}));

      // Recreate the new message to avoid race conditions with Redux
      const message = messages[id];
      const updatedData = {
        content: null,
        modifiedDate: now,
        transfer: null,
      };
      const newMessage = {...message, ...updatedData};
      await sendMessage(address, newMessage, self);

      dispatch(
        updateDeliveryData({
          deliveryAttempts: 1,
          deliveryStatus: DeliveryStatus.pending,
          messageId: id,
        }),
      );
    } catch (error) {
      displayErrorToast('Error resending the message');
    }
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    if (sender !== selfAccountNumber || isContentDeleted) return;
    setToolsVisible(true);
  };

  const renderDeliveryStatus = () => {
    if (selfAccountNumber !== sender || !system) return null;

    const icons = {
      [DeliveryStatus.error]: {
        color: colors.palette.orange['500'],
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.failed]: {
        color: colors.palette.red['500'],
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.pending]: {
        color: colors.palette.gray['500'],
        path: mdiClockOutline,
      },
      [DeliveryStatus.received]: {
        color: colors.palette.green['500'],
        path: mdiCheck,
      },
    };

    const {color, path} = icons[system.deliveryStatus];
    return <MdiIcon color={color} path={path} size="14px" />;
  };

  const renderEdited = () => {
    if (createdDate === modifiedDate) return null;
    return <S.Edited>(edited)</S.Edited>;
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

  const renderTools = () => {
    return (
      <S.ToolsContainer>
        <S.Tools $display={toolsVisible}>
          <S.Tool icon={mdiPencil} onClick={toggleEditMessageModal} size={18} totalSize="unset" />
          <S.Tool icon={mdiDelete} onClick={handleDeleteClick} size={18} totalSize="unset" />
        </S.Tools>
      </S.ToolsContainer>
    );
  };

  return (
    <>
      <S.Container className={className} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div>
          <UserAvatar displayOnlineStatus={false} src={account.avatar || ''} />
        </div>
        <S.Right>
          <S.Header>
            <S.HeaderLeft>
              <S.DisplayName>{account.display_name || sender}</S.DisplayName>
              <S.Date>{formattedDate(modifiedDate, true)}</S.Date>
              {renderEdited()}
            </S.HeaderLeft>
            <S.HeaderRight>
              {renderTools()}
              {renderDeliveryStatus()}
            </S.HeaderRight>
          </S.Header>
          {renderMessageBody()}
        </S.Right>
      </S.Container>
      {editMessageModalIsOpen ? <EditMessageModal close={toggleEditMessageModal} content={content} id={id} /> : null}
    </>
  );
};

export default Message;
