import {PaymentStatus, SetPaymentStatusParams} from 'apps/Shop/types';
import {orderIdSchema} from 'apps/Shop/utils/yup';
import yup from 'system/utils/yup';

export const setPaymentStatusValidator: yup.SchemaOf<SetPaymentStatusParams> = yup
  .object({
    orderId: orderIdSchema,
    paymentStatus: yup.mixed().oneOf([PaymentStatus.complete, PaymentStatus.error, PaymentStatus.partial]),
  })
  .noUnknown();

export const validateChangeInPaymentStatus = (currentPaymentStatus: PaymentStatus, newPaymentStatus: PaymentStatus) => {
  if (currentPaymentStatus === newPaymentStatus) throw new Error('No change in payment status');
};

export const validatePaymentStatusTransition = (
  currentPaymentStatus: PaymentStatus,
  newPaymentStatus: PaymentStatus,
) => {
  if (currentPaymentStatus === PaymentStatus.none) {
    const isValid = [PaymentStatus.complete, PaymentStatus.error, PaymentStatus.partial].includes(newPaymentStatus);
    if (!isValid) throw new Error('Invalid payment status transition');
  }

  if (currentPaymentStatus === PaymentStatus.partial) {
    const isValid = [PaymentStatus.complete, PaymentStatus.error].includes(newPaymentStatus);
    if (!isValid) throw new Error('Invalid payment status transition');
  }
};
