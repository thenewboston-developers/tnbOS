import {SHOP_ADDRESSES, SHOP_CART_PRODUCTS, SHOP_MANAGER, SHOP_PRODUCTS} from 'apps/Shop/store/constants';
import {Addresses, CartProducts, Manager, Products} from 'apps/Shop/types';

export interface ShopElectronStore {
  [SHOP_ADDRESSES]: Addresses;
  [SHOP_CART_PRODUCTS]: CartProducts;
  [SHOP_MANAGER]: Manager;
  [SHOP_PRODUCTS]: Products;
}
