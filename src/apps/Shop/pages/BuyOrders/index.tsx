import EmptyText from 'apps/Shop/components/EmptyText';
import {SFC} from 'system/types';

import Order from './Order';
import * as S from './Styles';

const BuyOrders: SFC = ({className}) => {
  const renderOrders = () => {
    const _orders = [1, 2].map((item) => <Order key={item} />);
    return <S.Orders>{_orders}</S.Orders>;
  };

  const renderContent = () => {
    if (!![1, 2].length) return renderOrders();
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
