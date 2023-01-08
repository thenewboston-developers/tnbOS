import {TradeRegistration} from 'apps/Trade/registration';
import {SetOffersParams, TradeFn} from 'apps/Trade/types';
import {AppPayload} from 'system/types';

const setOffersPayload = (params: SetOffersParams): AppPayload => {
  return {
    fn: TradeFn.setOffers,
    params,
    pid: TradeRegistration.appId,
  };
};

export default setOffersPayload;
