import {TRADE_MANAGER} from 'apps/Trade/store/constants';
import {Manager} from 'apps/Trade/types';

export interface TradeElectronStore {
  [TRADE_MANAGER]: Manager;
}
