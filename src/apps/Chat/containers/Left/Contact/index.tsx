import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import {getMessages} from 'apps/Chat/selectors/state';
import {setActiveChat} from 'apps/Chat/store/manager';
import {Contact as TContact} from 'apps/Chat/types';
import {useAccountDisplayImage, useAccountDisplayName, useAccountOnlineStatus} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {shortDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface ContactProps {
  contact: TContact;
  isActiveChat: boolean;
  notificationCount: number;
}

const Contact: SFC<ContactProps> = ({className, contact, isActiveChat, notificationCount}) => {
  const {accountNumber, lastActivityDate, lastMessageId} = contact;

  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 10);
  const messages = useSelector(getMessages);
  const onlineStatus = useAccountOnlineStatus(accountNumber);
  const self = useSelector(getSelf);

  const lastMessage = lastMessageId ? messages[lastMessageId] : null;

  const displayNotificationCount = useMemo((): boolean => {
    return !!notificationCount && !isActiveChat;
  }, [isActiveChat, notificationCount]);

  const getSnippet = (): string => {
    const lastMessageAmount = lastMessage?.transfer?.amount;
    const lastMessageContent = lastMessage?.content;
    if (!lastMessageAmount && !lastMessageContent) return 'No chat history';
    const snippet = lastMessageContent ? truncate(lastMessageContent, 32) : `+${lastMessageAmount!.toLocaleString()}`;
    return self.accountNumber === lastMessage?.sender ? `You: ${snippet}` : snippet;
  };

  const handleClick = () => {
    dispatch(setActiveChat(accountNumber));
  };

  const renderDate = () => {
    if (displayNotificationCount) return null;
    return <S.Date>{shortDate(lastActivityDate, false)}</S.Date>;
  };

  const renderNotificationCountContainer = () => {
    if (!displayNotificationCount) return null;
    return (
      <S.NotificationCountContainer>
        <S.NotificationCount>{notificationCount}</S.NotificationCount>
      </S.NotificationCountContainer>
    );
  };

  return (
    <S.Container className={className} isActiveChat={isActiveChat} onClick={handleClick}>
      <Avatar displayImage={displayImage} onlineStatus={onlineStatus} />
      <S.Right>
        <S.TopText>
          <S.DisplayName>{displayName}</S.DisplayName>
          {renderDate()}
        </S.TopText>
        <S.BottomText>{getSnippet()}</S.BottomText>
      </S.Right>
      {renderNotificationCountContainer()}
    </S.Container>
  );
};

export default Contact;
