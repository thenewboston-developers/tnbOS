import {PaymentStatus} from 'apps/Shop/types/orders';

export interface ApproveOrderParams {
  orderId: string;
  receivingAddress: string;
}

export interface SetPaymentStatusParams {
  orderId: string;
  paymentStatus: PaymentStatus;
}

export interface SetProductRecordReceiptParams {
  recordModifiedDate: string;
}

export enum ShopFn {
  approveOrder = 'approveOrder',
  createOrder = 'createOrder',
  getProductList = 'getProductList',
  setProductList = 'setProductList',
  setProductRecord = 'setProductRecord',
  setProductRecordReceipt = 'setProductRecordReceipt',
}
