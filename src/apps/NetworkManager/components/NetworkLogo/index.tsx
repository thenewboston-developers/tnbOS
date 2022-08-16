import {useSelector} from 'react-redux';

import StatusIndicator, {StatusIndicatorColor} from 'system/components/StatusIndicator';
import {getSocketStatuses} from 'system/selectors/state';
import {SFC, SocketStatus} from 'system/types';
import * as S from './Styles';

export interface NetworkLogoProps {
  displayImage: string;
  networkId: string;
}

const NetworkLogo: SFC<NetworkLogoProps> = ({className, displayImage, networkId}) => {
  const socketStatuses = useSelector(getSocketStatuses);

  const renderStatusIndicator = () => {
    const colors = {
      [SocketStatus.authenticated]: StatusIndicatorColor.green,
      [SocketStatus.connected]: StatusIndicatorColor.yellow,
      [SocketStatus.disconnected]: StatusIndicatorColor.gray,
      [SocketStatus.error]: StatusIndicatorColor.red,
    };
    const socketStatus = socketStatuses[networkId];
    return <StatusIndicator color={colors[socketStatus]} />;
  };

  return (
    <S.Container className={className}>
      <S.Img alt="logo" src={displayImage} />
      {renderStatusIndicator()}
    </S.Container>
  );
};

export default NetworkLogo;
