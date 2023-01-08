import {TradeRegistration} from 'apps/Trade/registration';
import {SetOffersReceiptParams, TradeFn} from 'apps/Trade/types';
import {AppPayload} from 'system/types';

const setOffersReceiptPayload = (params: SetOffersReceiptParams): AppPayload => {
  return {
    fn: TradeFn.setOffersReceipt,
    params,
    pid: TradeRegistration.appId,
  };
};

export default setOffersReceiptPayload;
