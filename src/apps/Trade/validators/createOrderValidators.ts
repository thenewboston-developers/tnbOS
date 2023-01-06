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
import yup, {accountNumberSchema} from 'system/utils/forms/yup';

export const createOrderValidator = yup.object({
  approvalExpirationDate: yup.date().required(),
  approvalStatus: yup
    .string()
    .required()
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
    .required(),
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
    .string()
    .required()
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
      receivingAddress: yup
        .string()
        .nullable()
        .test(
          'host-receiving-address-is-null',
          'Host receiving address must be null',
          (receivingAddress: any) => receivingAddress === null,
        ),
    })
    .required(),
  orderId: yup.string().required().uuid(),
  paymentExpirationDate: yup.date().required(),
  paymentStatus: yup
    .string()
    .required()
    .test(
      'payment-status-is-none',
      'Payment status must be set to none',
      (paymentStatus: any) => paymentStatus === PaymentStatus.none,
    ),
});

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

export const validateOfferExists = (clientAsset: string, hostAsset: string, offers: Offer[]): Offer => {
  const offer = offers.find((_offer) => _offer.clientAsset === clientAsset && _offer.hostAsset === hostAsset);
  if (!offer) throw new Error('Offer does not exist for the requested order');
  return offer;
};

export const validateOrderIdIsUnique = (id: string, orders: Dict<Order>) => {
  const orderIds = Object.keys(orders);
  if (orderIds.includes(id)) throw new Error('Order ID must be unique');
};

export const validateOrderParticipants = (client: OrderClient, host: OrderHost, offer: Offer) => {
  const clientOutgoingAmount = client.outgoingAmount;
  const clientOutgoingAsset = client.outgoingAsset;
  const hostOutgoingAmount = host.outgoingAmount;
  const hostOutgoingAsset = host.outgoingAsset;

  if (!clientOutgoingAmount || !hostOutgoingAmount) {
    throw new Error('Must include both client.outgoingAmount and host.outgoingAmount');
  }

  const isClientBuyingHostAsset = clientOutgoingAsset === offer.clientAsset;
  const isClientSellingHostAsset = clientOutgoingAsset === offer.hostAsset;

  if (!isClientBuyingHostAsset && !isClientSellingHostAsset) {
    throw new Error('client.outgoingAsset must match either asset or networkId');
  }

  // Client is buying offer host asset
  if (isClientBuyingHostAsset) {
    if (hostOutgoingAsset !== offer.hostAsset) {
      throw new Error(
        'When the client is buying the offer.hostAsset the host.outgoingAsset must match the offer.hostAsset',
      );
    }

    const terms = offer.saleTerms;

    if (!terms.enabled) throw new Error('Buying is not allowed for this asset');

    if (hostOutgoingAmount < terms.orderMin || hostOutgoingAmount > terms.orderMax) {
      throw new Error('host.outgoingAmount is not within order limits');
    }

    const assetAmount = hostOutgoingAmount;
    const assetPrice = terms.price;
    const expectedTotal = assetAmount * assetPrice;

    if (clientOutgoingAmount !== expectedTotal) {
      throw new Error(
        `client.outgoingAmount of ${clientOutgoingAmount} does not match expected value of ${expectedTotal}`,
      );
    }
  }

  // Client is selling offer host asset
  if (isClientSellingHostAsset) {
    if (hostOutgoingAsset !== offer.clientAsset) {
      throw new Error(
        'When the client is selling the offer.hostAsset the host.outgoingAsset must match the offer.clientAsset',
      );
    }

    const terms = offer.purchaseTerms;

    if (!terms.enabled) throw new Error('Selling is not allowed for this asset');

    if (clientOutgoingAmount < terms.orderMin || clientOutgoingAmount > terms.orderMax) {
      throw new Error('client.outgoingAmount is not within order limits');
    }

    const assetAmount = clientOutgoingAmount;
    const assetPrice = terms.price;
    const expectedTotal = Math.ceil(assetAmount * assetPrice);

    if (hostOutgoingAmount !== expectedTotal) {
      throw new Error(`host.outgoingAmount of ${hostOutgoingAmount} does not match expected value of ${expectedTotal}`);
    }
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
