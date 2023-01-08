import {useAccountOnlineStatus, useSafeDisplayImage} from 'system/hooks';
import {colors} from 'system/styles';
import {OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  accountNumber: string;
}

const Avatar: SFC<AvatarProps> = ({accountNumber, className}) => {
  const displayImage = useSafeDisplayImage(accountNumber);
  const onlineStatus = useAccountOnlineStatus(accountNumber);

  const renderStatus = () => {
    const indicatorColors = {
      [OnlineStatus.offline]: colors.palette.gray['300'],
      [OnlineStatus.online]: colors.palette.green['400'],
    };

    return <S.Status indicatorColor={indicatorColors[onlineStatus]} />;
  };

  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      {renderStatus()}
    </S.Container>
  );
};

export default Avatar;
