import {
  SHOP_ADDRESSES,
  SHOP_CART_PRODUCTS,
  SHOP_MANAGER,
  SHOP_ORDER_PRODUCTS,
  SHOP_ORDERS,
  SHOP_PRODUCT_RECORDS,
  SHOP_PRODUCTS,
} from 'apps/Shop/store/constants';
import {Addresses, CartProducts, Manager, Orders, ProductRecords, Products} from 'apps/Shop/types';

export interface ShopElectronStore {
  [SHOP_ADDRESSES]: Addresses;
  [SHOP_CART_PRODUCTS]: CartProducts;
  [SHOP_MANAGER]: Manager;
  [SHOP_ORDERS]: Orders;
  [SHOP_ORDER_PRODUCTS]: Products;
  [SHOP_PRODUCTS]: Products;
  [SHOP_PRODUCT_RECORDS]: ProductRecords;
}
