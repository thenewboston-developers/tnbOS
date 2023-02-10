import DropdownMenu from 'apps/Shop/components/DropdownMenu';
import {SFC} from 'system/types';

import ShopLogo from './assets/shop-logo.png';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>
        <S.Logo alt="Shop Logo" src={ShopLogo} />
      </S.Left>
      <S.Right>
        <DropdownMenu />
      </S.Right>
    </S.Container>
  );
};

export default Top;
