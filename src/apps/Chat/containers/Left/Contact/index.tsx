import {useDispatch, useSelector} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import {getMessages} from 'apps/Chat/selectors/state';
import {setActiveChat} from 'apps/Chat/store/manager';
import {useAccountDisplayImage, useAccountDisplayName, useAccountOnlineStatus} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {shortDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface ContactProps {
  accountNumber: string;
  isActiveChat: boolean;
  lastActivityDate: string;
  lastMessageId?: string;
}

const Contact: SFC<ContactProps> = ({accountNumber, className, isActiveChat, lastActivityDate, lastMessageId}) => {
  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 10);
  const messages = useSelector(getMessages);
  const onlineStatus = useAccountOnlineStatus(accountNumber);
  const self = useSelector(getSelf);

  const lastMessage = lastMessageId ? messages[lastMessageId] : null;

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
    if (accountNumber === 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c') return null;
    return <S.Date>{shortDate(lastActivityDate, false)}</S.Date>;
  };

  const renderNotificationCountContainer = () => {
    if (accountNumber !== 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c') return null;
    return (
      <S.NotificationCountContainer>
        <S.NotificationCount>5</S.NotificationCount>
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
