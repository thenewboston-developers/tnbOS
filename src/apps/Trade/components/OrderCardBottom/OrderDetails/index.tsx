import {useMemo} from 'react';

import OrderCardBottomContent from 'apps/Trade/components/OrderCardBottomContent';
import OrderCardHeader from 'apps/Trade/components/OrderCardHeader';
import {Order} from 'apps/Trade/types';
import {fullDate} from 'renderer/utils/dates';
import {SFC} from 'types';
import * as S from './Styles';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: SFC<OrderDetailsProps> = ({className, order}) => {
  const {createdDate, id} = order;

  const tableRows = useMemo(() => {
    return [
      {
        key: 'Order ID',
        value: id,
      },
      {
        key: 'Created Date',
        value: fullDate(createdDate),
      },
    ];
  }, [createdDate, id]);

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
