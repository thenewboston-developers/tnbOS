import {useDispatch} from 'react-redux';
import {mdiCartOutline} from '@mdi/js';

import TopMenuItem from 'apps/Shop/components/TopMenuItem';
import {useCartProductList} from 'apps/Shop/hooks';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const BuyMenuItems: SFC = () => {
  const cartProductList = useCartProductList();
  const dispatch = useDispatch<AppDispatch>();

  const handleCartClick = () => {
    dispatch(setActivePage(Page.buyCheckout));
  };

  const handleHomeClick = () => {
    dispatch(setActivePage(Page.buyHome));
  };

  const handleMyAddressesClick = () => {
    dispatch(setActivePage(Page.buyAddresses));
  };

  const handleOrdersClick = () => {
    dispatch(setActivePage(Page.buyOrders));
  };

  const renderProductCount = () => {
    if (!cartProductList.length) return null;
    return <S.ProductCount>{cartProductList.length}</S.ProductCount>;
  };

  return (
    <>
      <TopMenuItem onClick={handleHomeClick}>Home</TopMenuItem>
      <TopMenuItem onClick={handleMyAddressesClick}>My Addresses</TopMenuItem>
      <TopMenuItem onClick={handleOrdersClick}>Orders</TopMenuItem>
      <S.IconContainer onClick={handleCartClick}>
        <S.Icon path={mdiCartOutline} size="32px" />
        {renderProductCount()}
      </S.IconContainer>
    </>
  );
};

export default BuyMenuItems;
