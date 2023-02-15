import {useSelector} from 'react-redux';

import {Order} from 'apps/Shop/types';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';

import BuyerPayment from './BuyerPayment';
import FinalTransfer from './FinalTransfer';
import SellerApproval from './SellerApproval';
import * as S from './Styles';

export interface OrderPaymentProps {
  order: Order;
}

const OrderPayment: SFC<OrderPaymentProps> = ({className, order}) => {
  const self = useSelector(getSelf);

  const renderFinalTransfer = () => {
    if (self.accountNumber === order.buyer) return null;
    return <FinalTransfer order={order} />;
  };

  return (
    <S.Container className={className}>
      <SellerApproval order={order} />
      <BuyerPayment order={order} />
      {renderFinalTransfer()}
    </S.Container>
  );
};

export default OrderPayment;
