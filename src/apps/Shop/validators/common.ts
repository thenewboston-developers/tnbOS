import {productIdSchema} from 'apps/Shop/utils/yup';
import yup from 'system/utils/yup';

export const shopIdListValidator = yup.array().of(productIdSchema);

export const shopModifiedDateListValidator = yup.array().of(yup.date().required());

export const validateBlockSenderIsBuyer = (blockSender: string, buyer: string) => {
  if (blockSender !== buyer) throw new Error('Block sender must match order buyer');
};
