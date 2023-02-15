import {Order, Orders} from 'apps/Shop/types';
import {productIdSchema} from 'apps/Shop/utils/yup';
import yup from 'system/utils/yup';

export const shopIdListValidator = yup.array().of(productIdSchema);

export const shopModifiedDateListValidator = yup.array().of(yup.date().required());

export const validateBlockSenderIsBuyer = (blockSender: string, buyer: string) => {
  if (blockSender !== buyer) throw new Error('Block sender must match order buyer');
};

export const validateBlockSenderIsSeller = (blockSender: string, seller: string) => {
  if (blockSender !== seller) throw new Error('Block sender must match order seller');
};

export const validateOrderExists = (orderId: string, orders: Orders): Order => {
  const order = orders[orderId];
  if (!order) throw new Error('Order does not exist');
  return order;
};
