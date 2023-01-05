import {Offer, OffersSync, Page, WalletTab} from 'apps/Trade/types';
import {RootState} from 'system/types';

export const getActiveNetworkId = (state: RootState): string | null => state.trade.manager.activeNetworkId;
export const getActivePage = (state: RootState): Page => state.trade.manager.activePage;
export const getActiveWalletNetworkId = (state: RootState): string | null => state.trade.manager.activeWalletNetworkId;
export const getActiveWalletTab = (state: RootState): WalletTab => state.trade.manager.activeWalletTab;
export const getOffers = (state: RootState): Offer[] => state.trade.offers;
export const getOffersSync = (state: RootState): OffersSync => state.trade.offersSync;
export const getRemoteOffers = (state: RootState): Offer[] => state.trade.remoteOffers;
