import {ACCEPTABLE_ORDER_CREATED_DATE_LEEWAY_SECONDS, APPROVAL_WINDOW_SECONDS} from 'apps/Shop/constants/protocol';
import {Address, ApprovalStatus, Order, PaymentStatus, ShippingStatus} from 'apps/Shop/types';
import {orderIdSchema, productIdSchema} from 'apps/Shop/utils/yup';
import yup, {accountNumberSchema} from 'system/utils/yup';

const addressValidator: yup.SchemaOf<Address> = yup
  .object({
    address1: yup.string().required(),
    address2: yup.string().required(),
    addressId: yup.string().required(),
    city: yup.string().required(),
    countryCode: yup.string().required(),
    fullName: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required(),
  })
  .noUnknown();

interface IOrder extends Omit<Order, 'approvalExpirationDate' | 'createdDate' | 'paymentExpirationDate'> {
  approvalExpirationDate: Date;
  createdDate: Date;
  paymentExpirationDate: Date;
}

export const createOrderValidator: yup.SchemaOf<IOrder> = yup
  .object({
    address: addressValidator.required(),
    approvalExpirationDate: yup.date().required(),
    approvalStatus: yup
      .mixed()
      .test(
        'approval-status-is-pending',
        'Approval status must be set to pending',
        (approvalStatus: any) => approvalStatus === ApprovalStatus.pending,
      ),
    buyer: accountNumberSchema.required(),
    createdDate: yup
      .date()
      .required()
      .test('created-date-within-acceptable-range', 'Created date is outside the acceptable range', (value: any) => {
        const createdDate = new Date(value);
        const now = new Date();
        const timeDifferenceSeconds = Math.abs(createdDate.getTime() - now.getTime()) / 1000;
        return timeDifferenceSeconds <= ACCEPTABLE_ORDER_CREATED_DATE_LEEWAY_SECONDS;
      }),
    networkId: yup.string().required(),
    orderId: orderIdSchema,
    paymentExpirationDate: yup.date().required(),
    paymentStatus: yup
      .mixed()
      .test(
        'payment-status-is-none',
        'Payment status must be set to none',
        (paymentStatus: any) => paymentStatus === PaymentStatus.none,
      ),
    productIds: yup.array().of(productIdSchema),
    receivingAddress: yup.mixed().oneOf([null]),
    seller: accountNumberSchema.required(),
    shippingStatus: yup
      .mixed()
      .test(
        'shipping-status-is-not-shipped',
        'Shipping status must be set to not shipped',
        (shippingStatus: any) => shippingStatus === ShippingStatus.notShipped,
      ),
    total: yup.number().integer().min(0).required(),
  })
  .noUnknown();

export const validateApprovalExpirationDateIsCorrectValue = (approvalExpirationDate: string, createdDate: string) => {
  const createdTime = new Date(createdDate).getTime();
  const approvalExpirationTime = new Date(approvalExpirationDate).getTime();
  if ((approvalExpirationTime - createdTime) / 1000 !== APPROVAL_WINDOW_SECONDS) {
    throw new Error(
      `Approval expiration date must be exactly ${APPROVAL_WINDOW_SECONDS} seconds greater than created date`,
    );
  }
};
