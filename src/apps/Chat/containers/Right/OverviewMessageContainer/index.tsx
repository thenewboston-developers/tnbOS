import {useDispatch, useSelector} from 'react-redux';
import {mdiTrashCan} from '@mdi/js';

import Avatar from 'apps/Chat/components/Avatar';
import NetworkLogoMini from 'apps/Chat/containers/Right/NetworkLogoMini';
import {getActiveChat, getMessages} from 'apps/Chat/selectors/state';
import {unsetContact} from 'apps/Chat/store/contacts';
import {unsetDeliveries} from 'apps/Chat/store/deliveries';
import {setActiveChat} from 'apps/Chat/store/manager';
import {unsetMessages} from 'apps/Chat/store/messages';
import {
  useAccountDisplayImage,
  useAccountDisplayName,
  useAccountOnlineStatus,
  useUsersNetworkAccountOnlineStatuses,
} from 'system/hooks';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const OverviewMessageContainer: SFC = ({className}) => {
  const activeChat = useSelector(getActiveChat);
  const activeChatDisplayImage = useAccountDisplayImage(activeChat!);
  const activeChatDisplayName = useAccountDisplayName(activeChat!, 10);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(getMessages);
  const onlineStatus = useAccountOnlineStatus(activeChat!);
  const usersNetworkAccountOnlineStatuses = useUsersNetworkAccountOnlineStatuses(activeChat!);

  const handleDeleteClick = () => {
    const messageIds = Object.values(messages)
      .filter(({recipient, sender}) => [recipient, sender].includes(activeChat!))
      .map(({messageId}) => messageId);

    dispatch(setActiveChat(null));
    dispatch(unsetContact(activeChat!));
    dispatch(unsetDeliveries(messageIds));
    dispatch(unsetMessages(messageIds));
  };

  const renderUsersNetworks = () => {
    let right = 0;

    return Object.entries(usersNetworkAccountOnlineStatuses).map(([networkId, accountOnlineStatus]) => {
      right += 12;
      return <NetworkLogoMini key={networkId} networkId={networkId} onlineStatus={accountOnlineStatus} right={right} />;
    });
  };

  return (
    <S.Container className={className}>
      <S.Left>
        <Avatar displayImage={activeChatDisplayImage} onlineStatus={onlineStatus} />
        <S.LeftText>{activeChatDisplayName}</S.LeftText>
        <div onClick={handleDeleteClick}>
          <S.Icon path={mdiTrashCan} size="20px" />
        </div>
      </S.Left>
      <S.Right>{renderUsersNetworks()}</S.Right>
    </S.Container>
  );
};

export default OverviewMessageContainer;
