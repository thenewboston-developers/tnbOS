import OnlineIndicator, {OnlineIndicatorColor} from 'system/components/OnlineIndicator';
import {NetworkConnectionStatus, SFC} from 'system/types';
import * as S from './Styles';

export interface NetworkLogoProps {
  connectionStatus: NetworkConnectionStatus;
  displayImage: string;
}

const NetworkLogo: SFC<NetworkLogoProps> = ({className, connectionStatus, displayImage}) => {
  const getColor = () => {
    const iconColors = {
      [NetworkConnectionStatus.authenticated]: OnlineIndicatorColor.green,
      [NetworkConnectionStatus.connected]: OnlineIndicatorColor.yellow,
      [NetworkConnectionStatus.disconnected]: OnlineIndicatorColor.gray,
      [NetworkConnectionStatus.error]: OnlineIndicatorColor.red,
    };
    return iconColors[connectionStatus];
  };

  return (
    <S.Container className={className}>
      <S.Img alt="logo" src={displayImage} />
      <OnlineIndicator color={getColor()} />
    </S.Container>
  );
};

export default NetworkLogo;
