import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import OrderPayment from 'apps/Shop/components/OrderPayment';
import {getProducts} from 'apps/Shop/selectors/state';
import {Order as TOrder} from 'apps/Shop/types';
import {SFC} from 'system/types';

import OrderProduct from './OrderProduct';
import OrderTop from './OrderTop';
import * as S from './Styles';

export interface OrderProps {
  order: TOrder;
}

const Order: SFC<OrderProps> = ({className, order}) => {
  const products = useSelector(getProducts);

  const {address, productIds} = order;

  const orderProductList = useMemo(() => {
    return productIds.map((productId) => products[productId]);
  }, [productIds, products]);

  const renderBottom = () => {
    return (
      <S.Bottom>
        <S.AddressCard address={address} />
        {renderOrderProducts()}
        <OrderPayment />
      </S.Bottom>
    );
  };

  const renderOrderProducts = () => {
    const _orderProducts = orderProductList.map((product) => (
      <OrderProduct key={product.productId} product={product} />
    ));
    return <S.OrderProducts>{_orderProducts}</S.OrderProducts>;
  };

  return (
    <S.Container className={className}>
      <OrderTop order={order} />
      {renderBottom()}
    </S.Container>
  );
};

export default Order;
