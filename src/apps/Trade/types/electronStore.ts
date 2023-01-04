import {TRADE_MANAGER, TRADE_OFFERS, TRADE_OFFERS_SYNC} from 'apps/Trade/store/constants';
import {Manager, Offer, OffersSync} from 'apps/Trade/types';

export interface TradeElectronStore {
  [TRADE_MANAGER]: Manager;
  [TRADE_OFFERS]: Offer[];
  [TRADE_OFFERS_SYNC]: OffersSync;
}
