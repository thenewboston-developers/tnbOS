import {Offer} from 'apps/Trade/types/offers';
import {FillStatus, PaymentStatus} from 'apps/Trade/types/orders';

export interface ApproveOrderParams {
  hostReceivingAddress: string;
  orderId: string;
}

export interface SetFillStatusParams {
  fillStatus: FillStatus;
  orderId: string;
}

export interface SetOffersParams {
  modifiedDate: string;
  offers: Offer[];
}

export interface SetOffersReceiptParams {
  modifiedDate: string;
}

export interface SetPaymentStatusParams {
  orderId: string;
  paymentStatus: PaymentStatus;
}

export enum TradeFn {
  createOrder = 'createOrder',
  setFillStatus = 'setFillStatus',
  setOffers = 'setOffers',
  setOffersReceipt = 'setOffersReceipt',
  setOrderError = 'setOrderError',
  setPaymentStatus = 'setPaymentStatus',
}
