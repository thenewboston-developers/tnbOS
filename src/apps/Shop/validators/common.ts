import {Order, Orders, PaymentStatus} from 'apps/Shop/types';
import {productIdSchema} from 'apps/Shop/utils/yup';
import {getLiveBalance} from 'system/utils/liveBalances';
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

export const validatePayment = async (order: Order, newPaymentStatus: PaymentStatus) => {
  if (newPaymentStatus === PaymentStatus.error) return;

  const balance = await getLiveBalance(order.receivingAddress!, order.networkId);

  if (newPaymentStatus === PaymentStatus.partial) {
    const isValid = balance > 0 && balance < order.total;
    if (!isValid) throw new Error(`Partial payment must be greater than 0 and less than ${order.total}`);
    return;
  }

  if (newPaymentStatus === PaymentStatus.complete) {
    const isValid = balance >= order.total;
    if (!isValid) throw new Error(`Complete payment must be greater or equal to ${order.total}`);
    return;
  }

  throw new Error('Error validating payment');
};
