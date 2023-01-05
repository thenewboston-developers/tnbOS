import {TradeRegistration} from 'apps/Trade/registration';
import {Order, TradeFn} from 'apps/Trade/types';
import {AppPayload} from 'system/types';

const createOrderPayload = (params: Order): AppPayload => {
  return {
    fn: TradeFn.createOrder,
    params,
    pid: TradeRegistration.appId,
  };
};

export default createOrderPayload;
