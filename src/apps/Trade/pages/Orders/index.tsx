import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyActiveNetworkPage from 'apps/Trade/components/EmptyActiveNetworkPage';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import OrderCard from 'apps/Trade/components/OrderCard';
import PageHeader from 'apps/Trade/components/PageHeader';
import {getActiveNetworkId, getOrders} from 'apps/Trade/selectors/state';
import {SFC} from 'system/types';
import OrdersEmptyStateGraphic from './assets/orders-empty-state.png';
import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const orders = useSelector(getOrders);

  const orderList = useMemo(() => {
    if (!activeNetworkId) return [];
    return Object.values(orders).filter(({client, host}) =>
      [client.outgoingAsset, host.outgoingAsset].includes(activeNetworkId),
    );
  }, [activeNetworkId, orders]);

  const renderEmptyPage = () => {
    if (!activeNetworkId) return <EmptyActiveNetworkPage />;

    return (
      <EmptyPage
        bottomText="Orders related to your active network will appear here."
        graphic={OrdersEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderOrderCards = () => {
    const sortedOrders = orderBy(orderList, ['createdDate'], ['desc']);
    const orderCards = sortedOrders.map((order) => <OrderCard key={order.orderId} order={order} />);
    return <>{orderCards}</>;
  };

  const renderPageContent = () => {
    if (!orderList.length) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader title="Orders" />
        {renderOrderCards()}
      </S.Container>
    );
  };

  return renderPageContent();
};

export default Orders;
