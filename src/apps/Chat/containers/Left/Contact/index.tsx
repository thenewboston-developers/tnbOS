import {useDispatch, useSelector} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import {getMessages} from 'apps/Chat/selectors/state';
import {setActiveChat} from 'apps/Chat/store/manager';
import {shortDate} from 'apps/Chat/utils/dates';
import {useSafeDisplayImage, useSafeDisplayName} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, OnlineStatus, SFC} from 'system/types';
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
  const displayImage = useSafeDisplayImage(accountNumber);
  const displayName = useSafeDisplayName(accountNumber, 10);
  const messages = useSelector(getMessages);
  const self = useSelector(getSelf);

  const lastMessage = lastMessageId ? messages[lastMessageId] : null;

  const getSnippet = (): string => {
    if (!lastMessage?.content) return 'No chat history';
    const snippet = truncate(lastMessage.content, 32);
    return self.accountNumber === lastMessage?.sender ? `You: ${snippet}` : snippet;
  };

  const handleClick = () => {
    dispatch(setActiveChat(accountNumber));
  };

  return (
    <S.Container className={className} isActiveChat={isActiveChat} onClick={handleClick}>
      <Avatar displayImage={displayImage} onlineStatus={OnlineStatus.online} />
      <S.Right>
        <S.TopText>
          <S.DisplayName>{displayName}</S.DisplayName>
          <S.Date>{shortDate(lastActivityDate, false)}</S.Date>
        </S.TopText>
        <S.BottomText>{getSnippet()}</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default Contact;