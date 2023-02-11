import {Page, Products} from 'apps/Shop/types';
import {RootState} from 'system/types';

export const getActiveBuyProductId = (state: RootState): string | null => state.shop.manager.activeBuyProductId;
export const getActivePage = (state: RootState): Page => state.shop.manager.activePage;
export const getActiveSellProductId = (state: RootState): string | null => state.shop.manager.activeSellProductId;
export const getProducts = (state: RootState): Products => state.shop.products;
