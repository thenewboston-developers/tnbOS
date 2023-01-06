import {
  HoldingAccounts,
  Offer,
  OffersSync,
  OrderErrors,
  Orders,
  Page,
  ReceivingAccounts,
  Resolutions,
  Transactions,
  WalletTab,
} from 'apps/Trade/types';
import {RootState} from 'system/types';

export const getActiveNetworkId = (state: RootState): string | null => state.trade.manager.activeNetworkId;
export const getActivePage = (state: RootState): Page => state.trade.manager.activePage;
export const getActiveWalletNetworkId = (state: RootState): string | null => state.trade.manager.activeWalletNetworkId;
export const getActiveWalletTab = (state: RootState): WalletTab => state.trade.manager.activeWalletTab;
export const getHoldingAccounts = (state: RootState): HoldingAccounts => state.trade.holdingAccounts;
export const getOffers = (state: RootState): Offer[] => state.trade.offers;
export const getOffersSync = (state: RootState): OffersSync => state.trade.offersSync;
export const getOrderErrors = (state: RootState): OrderErrors => state.trade.orderErrors;
export const getOrders = (state: RootState): Orders => state.trade.orders;
export const getReceivingAccounts = (state: RootState): ReceivingAccounts => state.trade.receivingAccounts;
export const getRemoteOffers = (state: RootState): Offer[] => state.trade.remoteOffers;
export const getResolutions = (state: RootState): Resolutions => state.trade.resolutions;
export const getTransactions = (state: RootState): Transactions => state.trade.transactions;
