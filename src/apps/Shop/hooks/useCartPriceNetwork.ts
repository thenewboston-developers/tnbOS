import {useMemo} from 'react';

import useCartProductList from 'apps/Shop/hooks/useCartProductList';

const useCartPriceNetwork = (): string | null => {
  const cartProductList = useCartProductList();

  return useMemo(() => {
    return !!cartProductList.length ? cartProductList[0].priceNetwork : null;
  }, [cartProductList]);
};

export default useCartPriceNetwork;
