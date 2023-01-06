import {TradeRegistration} from 'apps/Trade/registration';
import {SetFillStatusParams, TradeFn} from 'apps/Trade/types';
import {AppPayload} from 'system/types';

const setFillStatusPayload = (params: SetFillStatusParams): AppPayload => {
  return {
    fn: TradeFn.setFillStatus,
    params,
    pid: TradeRegistration.appId,
  };
};

export default setFillStatusPayload;
