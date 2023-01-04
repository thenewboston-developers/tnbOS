import {useNetworkDisplayImage, useNetworkDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AssetLogoProps {
  bottomText?: string;
  networkId: string;
  topText?: string;
}

const AssetLogo: SFC<AssetLogoProps> = ({bottomText, className, networkId, topText}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);
  const networkDisplayName = useNetworkDisplayName(networkId);

  return (
    <S.Container className={className}>
      <S.Logo src={networkDisplayImage} />
      <S.Right>
        <S.TopText>{topText || networkDisplayName}</S.TopText>
        <S.BottomText>{bottomText || networkId}</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default AssetLogo;
