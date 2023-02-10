import {Page} from 'apps/Shop/types/pages';

export interface Manager {
  activePage: Page;
  activeSellProductId: string | null;
}
