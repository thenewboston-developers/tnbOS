import {
  TRADE_MANAGER,
  TRADE_OFFERS,
  TRADE_OFFERS_SYNC,
  TRADE_ORDERS,
  TRADE_RECEIVING_ACCOUNTS,
} from 'apps/Trade/store/constants';
import {Manager, Offer, OffersSync, Orders, ReceivingAccounts} from 'apps/Trade/types';

export interface TradeElectronStore {
  [TRADE_MANAGER]: Manager;
  [TRADE_OFFERS]: Offer[];
  [TRADE_OFFERS_SYNC]: OffersSync;
  [TRADE_ORDERS]: Orders;
  [TRADE_RECEIVING_ACCOUNTS]: ReceivingAccounts;
}
