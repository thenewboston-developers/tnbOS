import {SHOP_ADDRESSES, SHOP_MANAGER, SHOP_PRODUCTS} from 'apps/Shop/store/constants';
import {Addresses, Manager, Products} from 'apps/Shop/types';

export interface ShopElectronStore {
  [SHOP_ADDRESSES]: Addresses;
  [SHOP_MANAGER]: Manager;
  [SHOP_PRODUCTS]: Products;
}
