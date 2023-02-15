import {useMemo} from 'react';

import useCartProductList from 'apps/Shop/hooks/useCartProductList';

const useCartSeller = (): string | null => {
  const cartProductList = useCartProductList();

  return useMemo(() => {
    return !!cartProductList.length ? cartProductList[0].seller : null;
  }, [cartProductList]);
};

export default useCartSeller;
