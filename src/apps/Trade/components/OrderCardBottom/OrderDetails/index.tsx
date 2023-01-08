import {useMemo} from 'react';

import OrderCardBottomContent from 'apps/Trade/components/OrderCardBottomContent';
import OrderCardHeader from 'apps/Trade/components/OrderCardHeader';
import {Order} from 'apps/Trade/types';
import {longDate} from 'system/utils/dates';
import {SFC} from 'system/types';
import * as S from './Styles';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: SFC<OrderDetailsProps> = ({className, order}) => {
  const {createdDate, orderId} = order;

  const tableRows = useMemo(() => {
    return [
      {
        key: 'Order ID',
        value: orderId,
      },
      {
        key: 'Created Date',
        value: longDate(createdDate),
      },
    ];
  }, [createdDate, orderId]);

  return (
    <S.Container className={className}>
      <OrderCardHeader number={1} text="Order Details" />
      <OrderCardBottomContent>
        <S.Table rows={tableRows} />
      </OrderCardBottomContent>
    </S.Container>
  );
};

export default OrderDetails;
