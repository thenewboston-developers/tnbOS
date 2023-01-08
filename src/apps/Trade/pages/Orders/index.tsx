import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyActiveNetworkPage from 'apps/Trade/components/EmptyActiveNetworkPage';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import OrderCard from 'apps/Trade/components/OrderCard';
import PageHeader from 'apps/Trade/components/PageHeader';
import ViewMore from 'apps/Trade/components/ViewMore';
import {getActiveNetworkId, getOrders} from 'apps/Trade/selectors/state';
import {SFC} from 'system/types';
import OrdersEmptyStateGraphic from './assets/orders-empty-state.png';
import * as S from './Styles';

const PAGINATION_SIZE = 10;

const Orders: SFC = ({className}) => {
  const [maxLength, setMaxLength] = useState<number>(PAGINATION_SIZE);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const orders = useSelector(getOrders);

  const orderList = useMemo(() => {
    if (!activeNetworkId) return [];
    return orderBy(Object.values(orders), ['createdDate'], ['desc']).filter(({client, host}) =>
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
    const length = Math.min(orderList.length, maxLength);
    const results = orderList.slice(0, length);
    const orderCards = results.map((order) => <OrderCard key={order.orderId} order={order} />);
    return <>{orderCards}</>;
  };

  const renderPageContent = () => {
    if (!orderList.length) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader title="Orders" />
        {renderOrderCards()}
        {renderViewMore()}
      </S.Container>
    );
  };

  const renderViewMore = () => {
    if (maxLength >= orderList.length) return null;
    return <ViewMore onClick={() => setMaxLength(maxLength + PAGINATION_SIZE)} />;
  };

  return renderPageContent();
};

export default Orders;
