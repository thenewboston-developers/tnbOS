import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getCartProducts, getProducts} from 'apps/Shop/selectors/state';
import {Product} from 'apps/Shop/types';

const useCartProductList = (): Product[] => {
  const cartProducts = useSelector(getCartProducts);
  const products = useSelector(getProducts);

  return useMemo(() => {
    const orderedCartProducts = orderBy(Object.values(cartProducts), ['createdDate'], ['desc']);
    return orderedCartProducts.map(({productId}) => products[productId]);
  }, [cartProducts, products]);
};

export default useCartProductList;
