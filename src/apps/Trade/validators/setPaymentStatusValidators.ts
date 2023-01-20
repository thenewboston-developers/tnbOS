import {PaymentStatus} from 'apps/Trade/types';
import yup from 'system/utils/yup';

export const setPaymentStatusValidator = yup.object({
  orderId: yup.string().required().uuid(),
  paymentStatus: yup
    .string()
    .required()
    .test('is-valid-payment-status', 'Invalid payment status', (paymentStatus: any) => {
      const validPaymentStatuses = [PaymentStatus.complete, PaymentStatus.error, PaymentStatus.partial];
      return validPaymentStatuses.includes(paymentStatus);
    }),
});

export const validateChangeInPaymentStatus = (currentPaymentStatus: PaymentStatus, newPaymentStatus: PaymentStatus) => {
  if (currentPaymentStatus === newPaymentStatus) throw new Error('No change in payment status');
};

export const validatePaymentStatusTransition = (
  currentPaymentStatus: PaymentStatus,
  newPaymentStatus: PaymentStatus,
) => {
  if (currentPaymentStatus === PaymentStatus.none) {
    return [PaymentStatus.complete, PaymentStatus.error, PaymentStatus.partial].includes(newPaymentStatus);
  }

  if (currentPaymentStatus === PaymentStatus.partial) {
    return [PaymentStatus.complete, PaymentStatus.error].includes(newPaymentStatus);
  }

  throw new Error('Invalid payment status transition');
};
