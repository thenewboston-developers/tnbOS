import {ShopRegistration} from 'apps/Shop/registration';
import {ShopFn} from 'apps/Shop/types';
import {AppPayload} from 'system/types';

const getProductListPayload = (params: string[]): AppPayload => {
  return {
    fn: ShopFn.getProductList,
    params,
    pid: ShopRegistration.appId,
  };
};

export default getProductListPayload;
