import {
  Addresses,
  CartProducts,
  Orders,
  Page,
  ProductRecordRecipients,
  ProductRecords,
  Products,
  ReceivingAccounts,
  Transactions,
} from 'apps/Shop/types';
import {RootState} from 'system/types';

export const getActiveBuyAddressId = (state: RootState): string | null => state.shop.manager.activeBuyAddressId;
export const getActiveBuyProductId = (state: RootState): string | null => state.shop.manager.activeBuyProductId;
export const getActivePage = (state: RootState): Page => state.shop.manager.activePage;
export const getActiveSellProductId = (state: RootState): string | null => state.shop.manager.activeSellProductId;
export const getAddresses = (state: RootState): Addresses => state.shop.addresses;
export const getCartProducts = (state: RootState): CartProducts => state.shop.cartProducts;
export const getOrderProducts = (state: RootState): Products => state.shop.orderProducts;
export const getOrders = (state: RootState): Orders => state.shop.orders;
export const getProductRecordRecipients = (state: RootState): ProductRecordRecipients =>
  state.shop.productRecordRecipients;
export const getProductRecords = (state: RootState): ProductRecords => state.shop.productRecords;
export const getProducts = (state: RootState): Products => state.shop.products;
export const getReceivingAccounts = (state: RootState): ReceivingAccounts => state.shop.receivingAccounts;
export const getTransactions = (state: RootState): Transactions => state.shop.transactions;
