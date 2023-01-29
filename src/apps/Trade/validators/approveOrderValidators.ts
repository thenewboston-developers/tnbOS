import {ACCEPTABLE_TIME_TO_PAY_FOR_OPEN_ORDER_SECONDS} from 'apps/Trade/constants/protocol';
import {setApprovalStatus} from 'apps/Trade/store/orders';
import {ApprovalStatus, ApproveOrderParams, Order} from 'apps/Trade/types';
import {AppDispatch} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

export const approveOrderValidator: yup.SchemaOf<ApproveOrderParams> = yup
  .object({
    hostReceivingAddress: accountNumberSchema.required(),
    orderId: yup.string().required().uuid(),
  })
  .noUnknown();

export const validateBlockSenderIsOrderHost = (blockSender: string, order: Order) => {
  if (blockSender !== order.host.accountNumber) throw new Error('Block sender must be order host');
};

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
