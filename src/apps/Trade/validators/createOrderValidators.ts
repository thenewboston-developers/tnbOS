import {
  ACCEPTABLE_ORDER_CREATED_DATE_LEEWAY_SECONDS,
  APPROVAL_WINDOW_SECONDS,
  PAYMENT_WINDOW_SECONDS,
} from 'apps/Trade/constants/protocol';
import {
  ApprovalStatus,
  FillStatus,
  HoldingAccounts,
  Offer,
  Order,
  OrderClient,
  OrderHost,
  PaymentStatus,
} from 'apps/Trade/types';
import {getBalanceDetails} from 'apps/Trade/utils/balances';
import {Balances, Dict, Self} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

interface IOrder extends Omit<Order, 'approvalExpirationDate' | 'createdDate' | 'paymentExpirationDate'> {
  approvalExpirationDate: Date;
  createdDate: Date;
  paymentExpirationDate: Date;
}

interface TradeDetails {
  isUserBuyingClientAsset: boolean;
  isUserSellingClientAsset: boolean;
  offer: Offer;
}

export const createOrderValidator: yup.SchemaOf<IOrder> = yup
  .object({
    approvalExpirationDate: yup.date().required(),
    approvalStatus: yup
      .mixed()
      .test(
        'approval-status-is-pending',
        'Approval status must be set to pending',
        (approvalStatus: any) => approvalStatus === ApprovalStatus.pending,
      ),
    client: yup
      .object({
        accountNumber: accountNumberSchema.required(),
        outgoingAmount: yup.number().required(),
        outgoingAsset: yup.string().required(),
        receivingAddress: accountNumberSchema.required(),
      })
      .required()
      .noUnknown(),
    createdDate: yup
      .date()
      .required()
      .test('created-date-within-acceptable-range', 'Created date is outside the acceptable range', (value: any) => {
        const createdDate = new Date(value);
        const now = new Date();
        const timeDifferenceSeconds = Math.abs(createdDate.getTime() - now.getTime()) / 1000;
        return timeDifferenceSeconds <= ACCEPTABLE_ORDER_CREATED_DATE_LEEWAY_SECONDS;
      }),
    fillStatus: yup
      .mixed()
      .test(
        'fill-status-is-none',
        'Fill status must be set to none',
        (fillStatus: any) => fillStatus === FillStatus.none,
      ),
    host: yup
      .object({
        accountNumber: accountNumberSchema.required(),
        outgoingAmount: yup.number().required(),
        outgoingAsset: yup.string().required(),
        receivingAddress: yup.mixed().oneOf([null]),
      })
      .required()
      .noUnknown(),
    orderId: yup.string().required().uuid(),
    paymentExpirationDate: yup.date().required(),
    paymentStatus: yup
      .mixed()
      .test(
        'payment-status-is-none',
        'Payment status must be set to none',
        (paymentStatus: any) => paymentStatus === PaymentStatus.none,
      ),
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

export const validateClientIsNotHost = (client: OrderClient, host: OrderHost) => {
  if (client.accountNumber === host.accountNumber) {
    throw new Error('Client account number can not be the same as the host account number');
  }
};

export const validateHostIsSelf = (host: OrderHost, self: Self) => {
  if (host.accountNumber !== self.accountNumber) throw new Error('Host account number must match block recipient');
};

export const validateOfferExists = (offers: Offer[], order: Order): TradeDetails => {
  let offer;

  offer = offers.find(
    (_offer) => order.client.outgoingAsset === _offer.hostAsset && order.host.outgoingAsset === _offer.clientAsset,
  );

  if (offer) {
    return {
      isUserBuyingClientAsset: true,
      isUserSellingClientAsset: false,
      offer,
    };
  }

  offer = offers.find(
    (_offer) => order.client.outgoingAsset === _offer.clientAsset && order.host.outgoingAsset === _offer.hostAsset,
  );

  if (offer) {
    return {
      isUserBuyingClientAsset: false,
      isUserSellingClientAsset: true,
      offer,
    };
  }

  throw new Error('Offer does not exist for the requested order');
};

export const validateOrderIdIsUnique = (orderId: string, orders: Dict<Order>) => {
  const orderIds = Object.keys(orders);
  if (orderIds.includes(orderId)) throw new Error('Order ID must be unique');
};

export const validateOutgoingAmounts = (order: Order) => {
  if (!order.client.outgoingAmount || !order.host.outgoingAmount) {
    throw new Error('Order must include both client.outgoingAmount and host.outgoingAmount');
  }
};

export const validateOutgoingAssetBalance = (balances: Balances, holdingAccounts: HoldingAccounts, host: OrderHost) => {
  const hostOutgoingAmount = host.outgoingAmount;
  const hostOutgoingAsset = host.outgoingAsset;
  const {available} = getBalanceDetails(balances, holdingAccounts, hostOutgoingAsset);
  if (hostOutgoingAmount > available) throw new Error('Requested amount exceeds amount available');
};

export const validatePaymentExpirationDateIsCorrectValue = (createdDate: string, paymentExpirationDate: string) => {
  const createdTime = new Date(createdDate).getTime();
  const paymentExpirationTime = new Date(paymentExpirationDate).getTime();
  if ((paymentExpirationTime - createdTime) / 1000 !== PAYMENT_WINDOW_SECONDS) {
    throw new Error(
      `Payment expiration date must be exactly ${PAYMENT_WINDOW_SECONDS} seconds greater than created date`,
    );
  }
};

export const validateUserBuyingClientAsset = (offer: Offer, order: Order) => {
  const terms = offer.saleTerms;

  if (!terms.enabled) throw new Error('Buying is not allowed for this asset');

  if (order.host.outgoingAmount < terms.orderMin || order.host.outgoingAmount > terms.orderMax) {
    throw new Error('host.outgoingAmount is not within order limits');
  }

  const expectedTotal = Math.ceil(order.host.outgoingAmount * terms.price);

  if (order.client.outgoingAmount !== expectedTotal) {
    throw new Error(
      `client.outgoingAmount of ${order.client.outgoingAmount} does not match expected value of ${expectedTotal}`,
    );
  }
};

export const validateUserSellingClientAsset = (offer: Offer, order: Order) => {
  const terms = offer.purchaseTerms;

  if (!terms.enabled) throw new Error('Selling is not allowed for this asset');

  if (order.client.outgoingAmount < terms.orderMin || order.client.outgoingAmount > terms.orderMax) {
    throw new Error('client.outgoingAmount is not within order limits');
  }

  const expectedTotal = Math.ceil(order.client.outgoingAmount * terms.price);

  if (order.host.outgoingAmount !== expectedTotal) {
    throw new Error(
      `host.outgoingAmount of ${order.host.outgoingAmount} does not match expected value of ${expectedTotal}`,
    );
  }
};
