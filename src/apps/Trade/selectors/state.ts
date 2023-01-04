import {Offer, Page, WalletTab} from 'apps/Trade/types';
import {RootState} from 'system/types';

export const getActiveNetworkId = (state: RootState): string | null => state.trade.manager.activeNetworkId;
export const getActivePage = (state: RootState): Page => state.trade.manager.activePage;
export const getActiveWalletNetworkId = (state: RootState): string | null => state.trade.manager.activeWalletNetworkId;
export const getActiveWalletTab = (state: RootState): WalletTab => state.trade.manager.activeWalletTab;
export const getOffers = (state: RootState): Offer[] => state.trade.offers;