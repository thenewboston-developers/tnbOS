import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveSellProductId, getProducts} from 'apps/Shop/selectors/state';
import {Product} from 'apps/Shop/types';

const useActiveSellProduct = (): Product | undefined => {
  const activeSellProductId = useSelector(getActiveSellProductId);
  const products = useSelector(getProducts);

  return useMemo(() => {
    return activeSellProductId ? products[activeSellProductId] : undefined;
  }, [activeSellProductId, products]);
};

export default useActiveSellProduct;
