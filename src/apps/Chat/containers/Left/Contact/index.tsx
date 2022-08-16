import Avatar from 'apps/Chat/components/Avatar';
import {OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

export interface ContactProps {
  isActiveChat: boolean;
}

const Contact: SFC<ContactProps> = ({className, isActiveChat}) => {
  return (
    <S.Container className={className} isActiveChat={isActiveChat}>
      <Avatar displayImage="https://avatars.githubusercontent.com/u/8547538?v=4" onlineStatus={OnlineStatus.online} />
      <S.Right>
        <S.TopText>
          <S.DisplayName className="display-name">Bucky</S.DisplayName>
          <S.Date className="date">12/28/20</S.Date>
        </S.TopText>
        <S.BottomText>Hey now brown cow...</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default Contact;
