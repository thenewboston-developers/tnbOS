import {SHOP_ADDRESSES, SHOP_CART_PRODUCTS, SHOP_MANAGER, SHOP_ORDERS, SHOP_PRODUCTS} from 'apps/Shop/store/constants';
import {Addresses, CartProducts, Manager, Orders, Products} from 'apps/Shop/types';

export interface ShopElectronStore {
  [SHOP_ADDRESSES]: Addresses;
  [SHOP_CART_PRODUCTS]: CartProducts;
  [SHOP_MANAGER]: Manager;
  [SHOP_ORDERS]: Orders;
  [SHOP_PRODUCTS]: Products;
}
