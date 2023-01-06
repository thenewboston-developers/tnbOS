import {TradeRegistration} from 'apps/Trade/registration';
import {SetPaymentStatusParams, TradeFn} from 'apps/Trade/types';
import {AppPayload} from 'system/types';

const setPaymentStatusPayload = (params: SetPaymentStatusParams): AppPayload => {
  return {
    fn: TradeFn.setPaymentStatus,
    params,
    pid: TradeRegistration.appId,
  };
};

export default setPaymentStatusPayload;
