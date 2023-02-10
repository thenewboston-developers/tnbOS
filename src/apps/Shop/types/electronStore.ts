import {SHOP_MANAGER, SHOP_PRODUCTS} from 'apps/Shop/store/constants';
import {Manager, Products} from 'apps/Shop/types';

export interface ShopElectronStore {
  [SHOP_MANAGER]: Manager;
  [SHOP_PRODUCTS]: Products;
}
