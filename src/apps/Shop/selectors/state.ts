import {Page, Products} from 'apps/Shop/types';
import {RootState} from 'system/types';

export const getActivePage = (state: RootState): Page => state.shop.manager.activePage;
export const getProducts = (state: RootState): Products => state.shop.products;
