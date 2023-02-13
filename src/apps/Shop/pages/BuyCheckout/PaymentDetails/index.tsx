import {GenericVoidFunction} from 'shared/types';
import {useNetworkDisplayImage} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface PaymentDetailsProps {
  handlePlaceOrderClick: GenericVoidFunction;
  isButtonDisabled: boolean;
  networkId: string | null;
  totalPrice: number;
}

const PaymentDetails: SFC<PaymentDetailsProps> = ({
  className,
  handlePlaceOrderClick,
  isButtonDisabled,
  networkId,
  totalPrice,
}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);

  return (
    <S.Container className={className}>
      <S.PriceContainer>
        {networkId && <S.NetworkImage alt="display image" src={networkDisplayImage} />}
        <S.Amount>{totalPrice.toLocaleString()}</S.Amount>
      </S.PriceContainer>
      <S.Button disabled={isButtonDisabled} onClick={handlePlaceOrderClick} text="Place Order" />
    </S.Container>
  );
};

export default PaymentDetails;
