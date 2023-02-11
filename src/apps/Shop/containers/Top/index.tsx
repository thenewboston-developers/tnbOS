import {useDispatch} from 'react-redux';

import DropdownMenu from 'apps/Shop/components/DropdownMenu';
import {useIsOnBuyPage} from 'apps/Shop/hooks';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';

import BuyLogo from './assets/buy-logo.png';
import SellLogo from './assets/sell-logo.png';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isOnBuyPage = useIsOnBuyPage();

  const handleBuyLogoClick = () => {
    dispatch(setActivePage(Page.buyHome));
  };

  const handleMyAddressesClick = () => {
    dispatch(setActivePage(Page.buyAddresses));
  };

  const handleSellLogoClick = () => {
    dispatch(setActivePage(Page.sellProducts));
  };

  const renderBuyMenuItems = () => {
    return (
      <>
        <S.MenuItem onClick={handleMyAddressesClick}>My Addresses</S.MenuItem>
        <S.MenuItem>Orders</S.MenuItem>
      </>
    );
  };

  const renderLogo = () => {
    const clickHandler = isOnBuyPage ? handleBuyLogoClick : handleSellLogoClick;
    const src = isOnBuyPage ? BuyLogo : SellLogo;
    return <S.Logo alt="Shop Logo" onClick={clickHandler} src={src} />;
  };

  const renderMenuItems = () => {
    if (isOnBuyPage) return renderBuyMenuItems();
    return null;
  };

  return (
    <S.Container className={className}>
      <S.Left>{renderLogo()}</S.Left>
      <S.Right>
        {renderMenuItems()}
        <DropdownMenu />
      </S.Right>
    </S.Container>
  );
};

export default Top;
