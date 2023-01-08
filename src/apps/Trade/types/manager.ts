import {Page} from 'apps/Trade/types/pages';

export interface Manager {
  activeNetworkId: string | null;
  activePage: Page;
  activeWalletNetworkId: string | null;
  activeWalletTab: WalletTab;
}

export enum WalletTab {
  home = 'home',
  send = 'send',
  receive = 'receive',
}
