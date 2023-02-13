import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getProducts} from 'apps/Shop/selectors/state';
import {Product} from 'apps/Shop/types';
import {getSelf} from 'system/selectors/state';

const useAvailableProducts = (): Product[] => {
  const products = useSelector(getProducts);
  const self = useSelector(getSelf);

  return useMemo(() => {
    return Object.values(products).filter(({seller}) => seller !== self.accountNumber);
  }, [products, self.accountNumber]);
};

export default useAvailableProducts;
