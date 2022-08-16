import {colors} from 'apps/Chat/styles';
import {OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  displayImage: string;
  onlineStatus?: OnlineStatus;
}

const Avatar: SFC<AvatarProps> = ({className, displayImage, onlineStatus}) => {
  const renderStatus = () => {
    if (!onlineStatus) return null;
    const statusColors = {
      [OnlineStatus.offline]: colors.palette.gray['300'],
      [OnlineStatus.online]: colors.palette.green['300'],
    };
    return <S.Status indicatorColor={statusColors[onlineStatus]} />;
  };

  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      {renderStatus()}
    </S.Container>
  );
};

export default Avatar;
