import {Addresses, Page, Products} from 'apps/Shop/types';
import {RootState} from 'system/types';

export const getActiveBuyAddressId = (state: RootState): string | null => state.shop.manager.activeBuyAddressId;
export const getActiveBuyProductId = (state: RootState): string | null => state.shop.manager.activeBuyProductId;
export const getActivePage = (state: RootState): Page => state.shop.manager.activePage;
export const getActiveSellProductId = (state: RootState): string | null => state.shop.manager.activeSellProductId;
export const getAddresses = (state: RootState): Addresses => state.shop.addresses;
export const getProducts = (state: RootState): Products => state.shop.products;
