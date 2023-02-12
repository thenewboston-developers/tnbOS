import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {SFC} from 'system/types';
import * as S from './Styles';

const SellerApproval: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={1} text="Seller Approval" />
      <OrderPaymentContent>Hey now</OrderPaymentContent>
    </S.Container>
  );
};

export default SellerApproval;
