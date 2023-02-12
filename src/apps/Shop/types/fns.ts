import {PaymentStatus} from 'apps/Shop/types/orders';

export interface ApproveOrderParams {
  orderId: string;
  receivingAddress: string;
}

export interface SetPaymentStatusParams {
  orderId: string;
  paymentStatus: PaymentStatus;
}
