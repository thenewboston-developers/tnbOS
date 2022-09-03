import {useSelector} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import {getActiveChat} from 'apps/Chat/selectors/state';
import {useAccountOnlineStatus, useSafeDisplayImage, useSafeDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const OverviewMessageContainer: SFC = ({className}) => {
  const activeChat = useSelector(getActiveChat);
  const activeChatDisplayImage = useSafeDisplayImage(activeChat!);
  const activeChatDisplayName = useSafeDisplayName(activeChat!, 10);
  const onlineStatus = useAccountOnlineStatus(activeChat!);

  return (
    <S.Container className={className}>
      <Avatar displayImage={activeChatDisplayImage} onlineStatus={onlineStatus} />
      <S.Right>{activeChatDisplayName}</S.Right>
    </S.Container>
  );
};

export default OverviewMessageContainer;
