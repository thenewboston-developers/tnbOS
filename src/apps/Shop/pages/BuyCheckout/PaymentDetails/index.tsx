import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface PaymentDetailsProps {
  handlePlaceOrderClick: GenericVoidFunction;
  isButtonDisabled: boolean;
  totalPrice: number;
}

const PaymentDetails: SFC<PaymentDetailsProps> = ({className, handlePlaceOrderClick, isButtonDisabled, totalPrice}) => {
  return (
    <S.Container className={className}>
      <S.PriceContainer>
        <S.NetworkImage alt="display image" src="https://avatars.githubusercontent.com/u/12706692?s=200&v=4" />
        <S.Amount>{totalPrice.toLocaleString()}</S.Amount>
      </S.PriceContainer>
      <S.Button disabled={isButtonDisabled} onClick={handlePlaceOrderClick} text="Place Order" />
    </S.Container>
  );
};

export default PaymentDetails;
