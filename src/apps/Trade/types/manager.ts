import {Page} from 'apps/Trade/types/pages';

export interface Manager {
  activePage: Page;
  activeWalletTab: WalletTab;
}

export enum WalletTab {
  home = 'home',
  send = 'send',
  receive = 'receive',
}
