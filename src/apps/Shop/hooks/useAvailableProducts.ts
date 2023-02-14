import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import useUnavailableProductIds from 'apps/Shop/hooks/useUnavailableProductIds';
import {getProducts} from 'apps/Shop/selectors/state';
import {Product} from 'apps/Shop/types';
import {getSelf} from 'system/selectors/state';

const useAvailableProducts = (): Product[] => {
  const products = useSelector(getProducts);
  const self = useSelector(getSelf);
  const unavailableProductIds = useUnavailableProductIds();

  return useMemo(() => {
    return Object.values(products)
      .filter(({productId}) => !unavailableProductIds.includes(productId))
      .filter(({seller}) => seller !== self.accountNumber);
  }, [products, self.accountNumber, unavailableProductIds]);
};

export default useAvailableProducts;
