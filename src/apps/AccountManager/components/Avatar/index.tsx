import OnlineIndicator from 'system/components/OnlineIndicator';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  displayImage: string;
  displayOnlineStatus?: boolean;
  isOnline?: boolean;
}

const Avatar: SFC<AvatarProps> = ({className, displayImage, displayOnlineStatus = true, isOnline}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      {displayOnlineStatus && <OnlineIndicator isOnline={isOnline} />}
    </S.Container>
  );
};

export default Avatar;
