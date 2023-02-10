import {SHOP_MANAGER} from 'apps/Shop/store/constants';
import {Manager} from 'apps/Shop/types';

export interface ShopElectronStore {
  [SHOP_MANAGER]: Manager;
}
