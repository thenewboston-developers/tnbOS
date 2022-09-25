import {useSelector} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import NetworkLogoMini from 'apps/Chat/containers/Right/NetworkLogoMini';
import {getActiveChat} from 'apps/Chat/selectors/state';
import {
  useAccountOnlineStatus,
  useSafeDisplayImage,
  useSafeDisplayName,
  useUsersNetworkAccountOnlineStatuses,
} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const OverviewMessageContainer: SFC = ({className}) => {
  const activeChat = useSelector(getActiveChat);
  const activeChatDisplayImage = useSafeDisplayImage(activeChat!);
  const activeChatDisplayName = useSafeDisplayName(activeChat!, 10);
  const onlineStatus = useAccountOnlineStatus(activeChat!);
  const usersNetworkAccountOnlineStatuses = useUsersNetworkAccountOnlineStatuses(activeChat!);

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
      </S.Left>
      <S.Right>{renderUsersNetworks()}</S.Right>
    </S.Container>
  );
};

export default OverviewMessageContainer;
