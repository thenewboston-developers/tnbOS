import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'apps/Shop/components/EmptyText';
import Order from 'apps/Shop/components/Order';
import {getOrders} from 'apps/Shop/selectors/state';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const BuyOrders: SFC = ({className}) => {
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

  const orderList = useMemo(() => {
    const _orders = Object.values(orders).filter(({buyer}) => buyer === self.accountNumber);
    return orderBy(_orders, ['createdDate'], ['desc']);
  }, [orders, self.accountNumber]);

  const renderOrders = () => {
    const _orders = orderList.map((order) => <Order key={order.orderId} order={order} />);
    return <S.Orders>{_orders}</S.Orders>;
  };

  const renderContent = () => {
    if (!!orderList.length) return renderOrders();
    return <EmptyText>No orders to display.</EmptyText>;
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="Orders" />
      {renderContent()}
    </S.Container>
  );
};

export default BuyOrders;
