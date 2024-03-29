import {OffersSync} from 'apps/Trade/types';
import yup from 'system/utils/yup';

export const setOffersReceiptValidator = yup
  .object({
    modifiedDate: yup.date().required(),
  })
  .noUnknown();

export const validateModifiedDate = (modifiedDate: string, offersSync: OffersSync) => {
  if (modifiedDate !== offersSync.modifiedDate) throw new Error('Modified date does not match latest offers');
};
