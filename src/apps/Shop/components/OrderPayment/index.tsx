import {SFC} from 'system/types';

import BuyerPayment from './BuyerPayment';
import FinalTransfer from './FinalTransfer';
import SellerApproval from './SellerApproval';
import Shipping from './Shipping';
import * as S from './Styles';

const OrderPayment: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <SellerApproval />
      <BuyerPayment />
      <FinalTransfer />
      <Shipping />
    </S.Container>
  );
};

export default OrderPayment;
