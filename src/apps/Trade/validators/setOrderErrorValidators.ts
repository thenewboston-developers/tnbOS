import {Order, OrderErrors} from 'apps/Trade/types';
import {Self} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';

export const setOrderErrorValidator = yup.object({
  createdDate: yup.date().required(),
  creator: accountNumberSchema.required(),
  message: yup.string().required(),
  orderErrorId: yup.string().required().uuid(),
  orderId: yup.string().required().uuid(),
});

export const validateCreator = (blockSender: string, creator: string, order: Order, self: Self) => {
  if (blockSender !== creator) throw new Error('Block sender must match creator');
  const orderParticipants = [order.client.accountNumber, order.host.accountNumber];
  const counterParty = orderParticipants.find((orderParticipant) => orderParticipant !== self.accountNumber);
  if (blockSender !== counterParty) throw new Error('Access denied');
};

export const validateErrorIdIsUnique = (orderErrorId: string, orderErrors: OrderErrors) => {
  const orderErrorIds = Object.values(orderErrors).reduce((acc: string[], orderError) => {
    return [...acc, ...Object.keys(orderError)];
  }, []);
  if (orderErrorIds.includes(orderErrorId)) throw new Error('');
};
