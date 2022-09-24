import {useNetworkDisplayImage} from 'system/hooks';
import {OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

export interface NetworkLogoMiniProps {
  onlineStatus: OnlineStatus;
  networkId: string;
  right: number;
}

const NetworkLogoMini: SFC<NetworkLogoMiniProps> = ({className, onlineStatus, networkId, right}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);

  return <S.Img alt="logo" className={className} onlineStatus={onlineStatus} right={right} src={networkDisplayImage} />;
};

export default NetworkLogoMini;
