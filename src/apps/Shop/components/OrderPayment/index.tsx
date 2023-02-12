import {SFC} from 'system/types';

import BuyerPayment from './BuyerPayment';
import FinalTransfer from './FinalTransfer';
import SellerApproval from './SellerApproval';
import * as S from './Styles';

const OrderPayment: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <SellerApproval />
      <BuyerPayment />
      <FinalTransfer />
    </S.Container>
  );
};

export default OrderPayment;
