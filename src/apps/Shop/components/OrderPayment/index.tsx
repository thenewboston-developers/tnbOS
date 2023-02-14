import {Order} from 'apps/Shop/types';
import {SFC} from 'system/types';

import BuyerPayment from './BuyerPayment';
import FinalTransfer from './FinalTransfer';
import SellerApproval from './SellerApproval';
import Shipping from './Shipping';
import * as S from './Styles';

export interface OrderPaymentProps {
  order: Order;
}

const OrderPayment: SFC<OrderPaymentProps> = ({className, order}) => {
  return (
    <S.Container className={className}>
      <SellerApproval order={order} />
      <BuyerPayment />
      <FinalTransfer />
      <Shipping />
    </S.Container>
  );
};

export default OrderPayment;
