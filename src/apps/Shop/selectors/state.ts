import {Page} from 'apps/Shop/types';
import {RootState} from 'system/types';

export const getActivePage = (state: RootState): Page => state.shop.manager.activePage;
