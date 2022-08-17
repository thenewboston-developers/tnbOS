import {useDispatch} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import {setActiveChat} from 'apps/Chat/store/manager';
import {shortDate} from 'apps/Chat/utils/dates';
import {AppDispatch, OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

export interface ContactProps {
  accountNumber: string;
  displayImage: string;
  displayName: string;
  isActiveChat: boolean;
  lastActivityDate: string;
  lastMessageId?: string;
}

const Contact: SFC<ContactProps> = ({
  accountNumber,
  className,
  displayImage,
  displayName,
  isActiveChat,
  lastActivityDate,
  lastMessageId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

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
        <S.BottomText>Hey now brown cow...</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default Contact;
