import {ShopRegistration} from 'apps/Shop/registration';
import {SetProductRecordReceiptParams, ShopFn} from 'apps/Shop/types';
import {AppPayload} from 'system/types';

const setProductRecordReceiptPayload = (params: SetProductRecordReceiptParams): AppPayload => {
  return {
    fn: ShopFn.setProductRecordReceipt,
    params,
    pid: ShopRegistration.appId,
  };
};

export default setProductRecordReceiptPayload;
