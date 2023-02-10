import {useDispatch} from 'react-redux';

import DropdownMenu from 'apps/Shop/components/DropdownMenu';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';

import ShopLogo from './assets/shop-logo.png';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogoClick = () => {
    dispatch(setActivePage(Page.buyHome));
  };

  return (
    <S.Container className={className}>
      <S.Left>
        <S.Logo alt="Shop Logo" onClick={handleLogoClick} src={ShopLogo} />
      </S.Left>
      <S.Right>
        <DropdownMenu />
      </S.Right>
    </S.Container>
  );
};

export default Top;
