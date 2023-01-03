import {Page} from 'apps/Trade/types/pages';

export interface Manager {
  activePage: Page;
  activeWalletNetworkId: string | null;
  activeWalletTab: WalletTab;
}

export enum WalletTab {
  home = 'home',
  send = 'send',
  receive = 'receive',
}
