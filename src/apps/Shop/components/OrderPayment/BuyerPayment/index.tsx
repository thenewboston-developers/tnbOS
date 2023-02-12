import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {SFC} from 'system/types';
import * as S from './Styles';

const BuyerPayment: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={2} text="Buyer Payment" />
      <OrderPaymentContent>Hey now</OrderPaymentContent>
    </S.Container>
  );
};

export default BuyerPayment;
