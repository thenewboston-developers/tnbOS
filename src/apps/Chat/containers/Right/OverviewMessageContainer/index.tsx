import {useSelector} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import {getActiveChat} from 'apps/Chat/selectors/state';
import {useSafeDisplayImage, useSafeDisplayName} from 'system/hooks';
import {OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

const OverviewMessageContainer: SFC = ({className}) => {
  const activeChat = useSelector(getActiveChat);
  const activeChatDisplayImage = useSafeDisplayImage(activeChat!);
  const activeChatDisplayName = useSafeDisplayName(activeChat!, 10);

  return (
    <S.Container className={className}>
      <Avatar displayImage={activeChatDisplayImage} onlineStatus={OnlineStatus.offline} />
      <S.Right>{activeChatDisplayName}</S.Right>
    </S.Container>
  );
};

export default OverviewMessageContainer;
