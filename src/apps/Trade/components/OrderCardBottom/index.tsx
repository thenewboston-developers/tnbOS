import ClientPayment from 'apps/Trade/components/OrderCardBottom/ClientPayment';
import FinalTransfer from 'apps/Trade/components/OrderCardBottom/FinalTransfer';
import HostApproval from 'apps/Trade/components/OrderCardBottom/HostApproval';
import HostFulfillment from 'apps/Trade/components/OrderCardBottom/HostFulfillment';
import OrderDetails from 'apps/Trade/components/OrderCardBottom/OrderDetails';
import OrderErrors from 'apps/Trade/components/OrderCardBottom/OrderErrors';
import Resolution from 'apps/Trade/components/Resolution';
import {Order} from 'apps/Trade/types';
import {SFC} from 'system/types';
import * as S from './Styles';

interface OrderCardBottomProps {
  order: Order;
}

const OrderCardBottom: SFC<OrderCardBottomProps> = ({className, order}) => {
  return (
    <S.Container className={className}>
      <OrderErrors order={order} />
      <Resolution order={order} />
      <OrderDetails order={order} />
      <HostApproval order={order} />
      <ClientPayment order={order} />
      <HostFulfillment order={order} />
      <FinalTransfer order={order} />
    </S.Container>
  );
};

export default OrderCardBottom;
