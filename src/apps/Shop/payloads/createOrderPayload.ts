import {ShopRegistration} from 'apps/Shop/registration';
import {Order, ShopFn} from 'apps/Shop/types';
import {AppPayload} from 'system/types';

const createOrderPayload = (params: Order): AppPayload => {
  return {
    fn: ShopFn.createOrder,
    params,
    pid: ShopRegistration.appId,
  };
};

export default createOrderPayload;
