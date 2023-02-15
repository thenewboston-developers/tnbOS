import {ShopRegistration} from 'apps/Shop/registration';
import {SetPaymentStatusParams, ShopFn} from 'apps/Shop/types';
import {AppPayload} from 'system/types';

const setPaymentStatusPayload = (params: SetPaymentStatusParams): AppPayload => {
  return {
    fn: ShopFn.setPaymentStatus,
    params,
    pid: ShopRegistration.appId,
  };
};

export default setPaymentStatusPayload;
