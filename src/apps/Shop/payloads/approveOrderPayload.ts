import {ShopRegistration} from 'apps/Shop/registration';
import {ApproveOrderParams, ShopFn} from 'apps/Shop/types';
import {AppPayload} from 'system/types';

const approveOrderPayload = (params: ApproveOrderParams): AppPayload => {
  return {
    fn: ShopFn.approveOrder,
    params,
    pid: ShopRegistration.appId,
  };
};

export default approveOrderPayload;
