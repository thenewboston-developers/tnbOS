import {GenericVoidFunction} from 'shared/types';
import {useNetworkDisplayImage, useNetworkDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

interface RadioCardProps {
  handleRadioCardClick: GenericVoidFunction;
  networkId: string;
  selectedNetworkId: string | null;
}

const RadioCard: SFC<RadioCardProps> = ({className, handleRadioCardClick, networkId, selectedNetworkId}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);
  const networkDisplayName = useNetworkDisplayName(networkId, 16);

  return (
    <S.Container
      className={className}
      isActive={networkId === selectedNetworkId}
      key={networkId}
      onClick={handleRadioCardClick}
    >
      <S.Logo src={networkDisplayImage} />
      <S.Name>{networkDisplayName}</S.Name>
    </S.Container>
  );
};

export default RadioCard;
