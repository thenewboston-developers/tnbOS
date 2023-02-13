import {ShopRegistration} from 'apps/Shop/registration';
import {ProductRecord, ShopFn} from 'apps/Shop/types';
import {AppPayload} from 'system/types';
import {sortAttributesAlphabetically} from 'system/utils/attributes';

const setProductRecordPayload = (params: ProductRecord): AppPayload => {
  return {
    fn: ShopFn.setProductRecord,
    params: {
      productModifiedDates: sortAttributesAlphabetically(params.productModifiedDates),
      recordModifiedDate: params.recordModifiedDate,
    },
    pid: ShopRegistration.appId,
  };
};

export default setProductRecordPayload;
