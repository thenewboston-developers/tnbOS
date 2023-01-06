import {TradeRegistration} from 'apps/Trade/registration';
import {ApproveOrderParams, TradeFn} from 'apps/Trade/types';
import {AppPayload} from 'system/types';

const approveOrderPayload = (params: ApproveOrderParams): AppPayload => {
  return {
    fn: TradeFn.approveOrder,
    params,
    pid: TradeRegistration.appId,
  };
};

export default approveOrderPayload;
