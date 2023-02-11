import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActivePage} from 'apps/Shop/selectors/state';
import {Page} from 'apps/Shop/types';

const BUY_PAGES = [Page.buyAddressDetails, Page.buyAddresses, Page.buyHome, Page.buyOrders, Page.buyProductDetails];

const useIsOnBuyPage = (): boolean => {
  const activePage = useSelector(getActivePage);

  return useMemo(() => {
    return BUY_PAGES.includes(activePage);
  }, [activePage]);
};

export default useIsOnBuyPage;
