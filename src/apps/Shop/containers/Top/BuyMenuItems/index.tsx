import {useDispatch} from 'react-redux';
import {mdiCartOutline} from '@mdi/js';

import TopMenuItem from 'apps/Shop/components/TopMenuItem';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const BuyMenuItems: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleMyAddressesClick = () => {
    dispatch(setActivePage(Page.buyAddresses));
  };

  const handleOrdersClick = () => {
    dispatch(setActivePage(Page.buyOrders));
  };

  const renderProductCount = () => {
    if (!2) return null;
    return <S.ProductCount>2</S.ProductCount>;
  };

  return (
    <>
      <TopMenuItem onClick={handleMyAddressesClick}>My Addresses</TopMenuItem>
      <TopMenuItem onClick={handleOrdersClick}>Orders</TopMenuItem>
      <S.IconContainer>
        <S.Icon path={mdiCartOutline} size="32px" />
        {renderProductCount()}
      </S.IconContainer>
    </>
  );
};

export default BuyMenuItems;
