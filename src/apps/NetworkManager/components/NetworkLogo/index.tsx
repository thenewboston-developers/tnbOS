import {useSelector} from 'react-redux';

import OnlineIndicator, {OnlineIndicatorColor} from 'system/components/OnlineIndicator';
import {getSocketStatuses} from 'system/selectors/state';
import {SFC, SocketStatus} from 'system/types';
import * as S from './Styles';

export interface NetworkLogoProps {
  displayImage: string;
  networkId: string;
}

const NetworkLogo: SFC<NetworkLogoProps> = ({className, displayImage, networkId}) => {
  const socketStatuses = useSelector(getSocketStatuses);

  const getColor = () => {
    const iconColors = {
      [SocketStatus.authenticated]: OnlineIndicatorColor.green,
      [SocketStatus.connected]: OnlineIndicatorColor.yellow,
      [SocketStatus.disconnected]: OnlineIndicatorColor.gray,
      [SocketStatus.error]: OnlineIndicatorColor.red,
    };
    const socketStatus = socketStatuses[networkId];
    return iconColors[socketStatus];
  };

  return (
    <S.Container className={className}>
      <S.Img alt="logo" src={displayImage} />
      <OnlineIndicator color={getColor()} />
    </S.Container>
  );
};

export default NetworkLogo;
