import {Page} from 'apps/Shop/types/pages';

export interface Manager {
  activeBuyAddressId: string | null;
  activeBuyProductId: string | null;
  activePage: Page;
  activeSellProductId: string | null;
}
