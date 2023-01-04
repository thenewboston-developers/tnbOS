import {TRADE_MANAGER, TRADE_OFFERS} from 'apps/Trade/store/constants';
import {Manager, Offer} from 'apps/Trade/types';

export interface TradeElectronStore {
  [TRADE_MANAGER]: Manager;
  [TRADE_OFFERS]: Offer[];
}
