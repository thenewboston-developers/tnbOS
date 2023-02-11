import {useDispatch} from 'react-redux';

import TopMenuItem from 'apps/Shop/components/TopMenuItem';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';

const BuyMenuItems: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleMyAddressesClick = () => {
    dispatch(setActivePage(Page.buyAddresses));
  };

  const handleOrdersClick = () => {
    dispatch(setActivePage(Page.buyOrders));
  };

  return (
    <>
      <TopMenuItem onClick={handleMyAddressesClick}>My Addresses</TopMenuItem>
      <TopMenuItem onClick={handleOrdersClick}>Orders</TopMenuItem>
    </>
  );
};

export default BuyMenuItems;
