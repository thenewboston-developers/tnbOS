import StatusIndicator, {StatusIndicatorColor} from 'system/components/StatusIndicator';
import {OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  displayImage: string;
  onlineStatus?: OnlineStatus;
}

const Avatar: SFC<AvatarProps> = ({className, displayImage, onlineStatus}) => {
  const renderStatusIndicator = () => {
    if (!onlineStatus) return null;
    const colors = {
      [OnlineStatus.offline]: StatusIndicatorColor.gray,
      [OnlineStatus.online]: StatusIndicatorColor.green,
    };
    return <StatusIndicator color={colors[onlineStatus]} />;
  };

  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      {renderStatusIndicator()}
    </S.Container>
  );
};

export default Avatar;
