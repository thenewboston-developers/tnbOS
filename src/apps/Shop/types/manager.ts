import {Page} from 'apps/Shop/types/pages';

export interface Manager {
  activeBuyProductId: string | null;
  activePage: Page;
  activeSellProductId: string | null;
}
