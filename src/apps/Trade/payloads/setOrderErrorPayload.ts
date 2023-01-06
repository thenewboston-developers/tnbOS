import {TradeRegistration} from 'apps/Trade/registration';
import {OrderError, TradeFn} from 'apps/Trade/types';
import {AppPayload} from 'system/types';

const setOrderErrorPayload = (params: OrderError): AppPayload => {
  return {
    fn: TradeFn.setOrderError,
    params,
    pid: TradeRegistration.appId,
  };
};

export default setOrderErrorPayload;
