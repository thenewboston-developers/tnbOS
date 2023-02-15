import {ShopRegistration} from 'apps/Shop/registration';
import {Product, ShopFn} from 'apps/Shop/types';
import {AppPayload} from 'system/types';

const setProductListPayload = (params: Product[]): AppPayload => {
  return {
    fn: ShopFn.setProductList,
    params,
    pid: ShopRegistration.appId,
  };
};

export default setProductListPayload;
