import {ACCEPTABLE_TIME_TO_PAY_FOR_OPEN_ORDER_SECONDS} from 'apps/Shop/constants/protocol';
import {setApprovalStatus} from 'apps/Shop/store/orders';
import {ApprovalStatus, ApproveOrderParams, Order, Orders} from 'apps/Shop/types';
import {orderIdSchema} from 'apps/Shop/utils/yup';
import {AppDispatch} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

export const approveOrderValidator: yup.SchemaOf<ApproveOrderParams> = yup
  .object({
    orderId: orderIdSchema,
    receivingAddress: accountNumberSchema.required(),
  })
  .noUnknown();

export const validateOrderIsPending = (order: Order) => {
  if (order.approvalStatus !== ApprovalStatus.pending) {
    throw new Error('Order approval status is not pending and therefore can not be approved');
  }
};

export const validatePaymentExpirationDate = (dispatch: AppDispatch, order: Order) => {
  const now = new Date();
  const paymentExpirationDate = new Date(order.paymentExpirationDate);
  const timeRemainingToPaySeconds = (paymentExpirationDate.getTime() - now.getTime()) / 1000;

  if (timeRemainingToPaySeconds <= ACCEPTABLE_TIME_TO_PAY_FOR_OPEN_ORDER_SECONDS) {
    dispatch(
      setApprovalStatus({
        approvalStatus: ApprovalStatus.expired,
        orderId: order.orderId,
      }),
    );
    throw new Error('Payment window has expired');
  }
};

export const validateReceivingAddressIsUnique = (order: Order, orders: Orders, receivingAddress: string) => {
  const receivingAddresses = Object.values(orders).map((_order) => _order.receivingAddress);
  const accountNumbersSet = new Set([order.buyer, order.seller, ...receivingAddresses]);
  if (accountNumbersSet.has(receivingAddress)) throw new Error('Receiving address provided is not unique');
};
