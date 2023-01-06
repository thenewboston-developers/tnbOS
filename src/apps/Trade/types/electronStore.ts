import {
  TRADE_HOLDING_ACCOUNTS,
  TRADE_MANAGER,
  TRADE_OFFERS,
  TRADE_OFFERS_SYNC,
  TRADE_ORDER_ERRORS,
  TRADE_ORDERS,
  TRADE_RECEIVING_ACCOUNTS,
  TRADE_RESOLUTIONS,
  TRADE_TRANSACTIONS,
} from 'apps/Trade/store/constants';
import {
  HoldingAccounts,
  Manager,
  Offer,
  OffersSync,
  OrderErrors,
  Orders,
  ReceivingAccounts,
  Resolutions,
  Transactions,
} from 'apps/Trade/types';

export interface TradeElectronStore {
  [TRADE_HOLDING_ACCOUNTS]: HoldingAccounts;
  [TRADE_MANAGER]: Manager;
  [TRADE_OFFERS]: Offer[];
  [TRADE_OFFERS_SYNC]: OffersSync;
  [TRADE_ORDERS]: Orders;
  [TRADE_ORDER_ERRORS]: OrderErrors;
  [TRADE_RECEIVING_ACCOUNTS]: ReceivingAccounts;
  [TRADE_RESOLUTIONS]: Resolutions;
  [TRADE_TRANSACTIONS]: Transactions;
}
