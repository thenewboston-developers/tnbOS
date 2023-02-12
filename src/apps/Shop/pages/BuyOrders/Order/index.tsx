import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getProducts} from 'apps/Shop/selectors/state';
import {Order as TOrder} from 'apps/Shop/types';
import {SFC} from 'system/types';

import OrderProduct from './OrderProduct';
import * as S from './Styles';

export interface OrderProps {
  order: TOrder;
}

const Order: SFC<OrderProps> = ({className, order}) => {
  const products = useSelector(getProducts);

  const {address, productIds, total} = order;

  const orderProductList = useMemo(() => {
    return productIds.map((productId) => products[productId]);
  }, [productIds, products]);

  const renderBottom = () => {
    return (
      <S.Bottom>
        <S.AddressCard address={address} />
        {renderOrderProducts()}
      </S.Bottom>
    );
  };

  const renderOrderProducts = () => {
    const _orderProducts = orderProductList.map((product) => (
      <OrderProduct key={product.productId} product={product} />
    ));
    return <S.OrderProducts>{_orderProducts}</S.OrderProducts>;
  };

  const renderPrice = () => {
    return (
      <S.PriceContainer>
        <S.PriceNetworkImage alt="display image" src="https://avatars.githubusercontent.com/u/12706692?s=200&v=4" />
        <S.PriceAmount>{total.toLocaleString()}</S.PriceAmount>
      </S.PriceContainer>
    );
  };

  const renderTop = () => {
    return (
      <S.Top>
        <S.TopDetail>
          <S.TopLabel>ORDER DATE</S.TopLabel>
          <S.TopValue>February 3, 2023</S.TopValue>
        </S.TopDetail>
        <S.TopDetail>
          <S.TopLabel>TOTAL</S.TopLabel>
          <S.TopValue>{renderPrice()}</S.TopValue>
        </S.TopDetail>
      </S.Top>
    );
  };

  return (
    <S.Container className={className}>
      {renderTop()}
      {renderBottom()}
    </S.Container>
  );
};

export default Order;
