import {useNetworkDisplayImage} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

interface TransferProps {
  amount: number;
  networkId: string;
}

const Transfer: SFC<TransferProps> = ({amount, className, networkId}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);

  return (
    <S.Container className={className}>
      <S.FlexContainer>
        <S.Amount>+{amount.toLocaleString()}</S.Amount>
        <S.Logo alt="logo" src={networkDisplayImage} />
      </S.FlexContainer>
    </S.Container>
  );
};

export default Transfer;
