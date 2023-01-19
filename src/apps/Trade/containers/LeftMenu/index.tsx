import {mdiFileSign, mdiMinusCircleOutline, mdiPlusCircleOutline, mdiTextBoxOutline, mdiWalletOutline} from '@mdi/js';

import MenuItem from 'apps/Trade/containers/LeftMenu/MenuItem';
import {Page} from 'apps/Trade/types';
import {SFC} from 'system/types';

import TradeLogo from './assets/trade-logo.png';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  const renderAutomatedMenu = () => (
    <>
      <S.MenuTitle>AUTOMATED</S.MenuTitle>
      <MenuItem icon={mdiFileSign} page={Page.offers} text="Offers" />
    </>
  );

  const renderGeneralMenu = () => (
    <>
      <S.MenuTitle>GENERAL</S.MenuTitle>
      <MenuItem icon={mdiTextBoxOutline} page={Page.orders} text="Orders" />
      <MenuItem icon={mdiWalletOutline} page={Page.wallets} text="Wallets" />
    </>
  );

  const renderLogoContainer = () => {
    return (
      <S.LogoContainer>
        <S.Logo alt="Trade Logo" src={TradeLogo} />
      </S.LogoContainer>
    );
  };

  const renderManualMenu = () => (
    <>
      <S.MenuTitle>MANUAL</S.MenuTitle>
      <MenuItem icon={mdiPlusCircleOutline} page={Page.buy} text="Buy" />
      <MenuItem icon={mdiMinusCircleOutline} page={Page.sell} text="Sell" />
    </>
  );

  return (
    <S.Container className={className}>
      {renderLogoContainer()}
      {renderManualMenu()}
      {renderAutomatedMenu()}
      {renderGeneralMenu()}
    </S.Container>
  );
};

export default LeftMenu;
