import {Address} from 'apps/Shop/types/addresses';
import {Dict} from 'system/types';

export enum ApprovalStatus {
  approved = 'approved',
  error = 'error',
  expired = 'expired',
  pending = 'pending',
}

export interface Order {
  address: Address;
  approvalExpirationDate: string;
  approvalStatus: ApprovalStatus;
  buyer: string;
  createdDate: string;
  networkId: string;
  orderId: string;
  paymentExpirationDate: string;
  paymentStatus: PaymentStatus;
  productIds: string[];
  receivingAddress: string | null;
  seller: string;
  total: number;
}

export type Orders = Dict<Order>;

export enum PaymentStatus {
  complete = 'complete',
  error = 'error',
  expired = 'expired',
  none = 'none',
  partial = 'partial',
}
