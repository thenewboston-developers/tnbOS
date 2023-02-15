import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'apps/Shop/components/EmptyText';
import Order from 'apps/Shop/components/Order';
import {getOrders} from 'apps/Shop/selectors/state';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const PAGINATION_SIZE = 10;

const BuyOrders: SFC = ({className}) => {
  const [maxLength, setMaxLength] = useState<number>(PAGINATION_SIZE);
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

  const orderList = useMemo(() => {
    const _orders = Object.values(orders).filter(({buyer}) => buyer === self.accountNumber);
    return orderBy(_orders, ['createdDate'], ['desc']);
  }, [orders, self.accountNumber]);

  const renderContent = () => {
    if (!!orderList.length) return renderOrders();
    return <EmptyText>No orders to display.</EmptyText>;
  };

  const renderOrders = () => {
    const length = Math.min(orderList.length, maxLength);
    const results = orderList.slice(0, length);
    const _orders = results.map((order) => <Order key={order.orderId} order={order} />);
    return <S.Orders>{_orders}</S.Orders>;
  };

  const renderViewMore = () => {
    if (maxLength >= orderList.length) return null;
    return <S.ViewMore onClick={() => setMaxLength(maxLength + PAGINATION_SIZE)} />;
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="Orders" />
      {renderContent()}
      {renderViewMore()}
    </S.Container>
  );
};

export default BuyOrders;
