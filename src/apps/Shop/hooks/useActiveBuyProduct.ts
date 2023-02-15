import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveBuyProductId, getProducts} from 'apps/Shop/selectors/state';
import {Product} from 'apps/Shop/types';

const useActiveBuyProduct = (): Product | undefined => {
  const activeBuyProductId = useSelector(getActiveBuyProductId);
  const products = useSelector(getProducts);

  return useMemo(() => {
    return activeBuyProductId ? products[activeBuyProductId] : undefined;
  }, [activeBuyProductId, products]);
};

export default useActiveBuyProduct;
