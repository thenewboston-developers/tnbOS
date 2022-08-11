import OnlineIndicator, {OnlineIndicatorColor} from 'system/components/OnlineIndicator';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  displayImage: string;
  displayOnlineStatus?: boolean;
  isOnline?: boolean;
}

const Avatar: SFC<AvatarProps> = ({className, displayImage, displayOnlineStatus = true, isOnline}) => {
  const getColor = () => {
    return isOnline ? OnlineIndicatorColor.green : OnlineIndicatorColor.gray;
  };

  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      {displayOnlineStatus && <OnlineIndicator color={getColor()} />}
    </S.Container>
  );
};

export default Avatar;
