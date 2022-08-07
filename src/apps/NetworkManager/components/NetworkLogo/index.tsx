import OnlineIndicator from 'system/components/OnlineIndicator';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface NetworkLogoProps {
  displayImage: string;
  displayOnlineStatus?: boolean;
  isOnline?: boolean;
}

const NetworkLogo: SFC<NetworkLogoProps> = ({className, displayImage, displayOnlineStatus = true, isOnline}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="logo" src={displayImage} />
      {displayOnlineStatus && <OnlineIndicator isOnline={isOnline} />}
    </S.Container>
  );
};

export default NetworkLogo;
