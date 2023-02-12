import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {SFC} from 'system/types';
import * as S from './Styles';

const FinalTransfer: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={3} text="Final Transfer" />
      <OrderPaymentContent>Hey now</OrderPaymentContent>
    </S.Container>
  );
};

export default FinalTransfer;
