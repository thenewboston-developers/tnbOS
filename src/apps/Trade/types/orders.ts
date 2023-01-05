export enum ApprovalStatus {
  approved = 'approved',
  error = 'error',
  expired = 'expired',
  pending = 'pending',
}

export enum FillStatus {
  complete = 'complete',
  none = 'none',
  partial = 'partial',
}

export interface Order {
  approvalExpirationDate: string;
  approvalStatus: ApprovalStatus;
  client: OrderClient;
  createdDate: string;
  fillStatus: FillStatus;
  host: OrderHost;
  orderId: string;
  paymentExpirationDate: string;
  paymentStatus: PaymentStatus;
}

export interface OrderClient extends OrderParticipant {
  receivingAddress: string;
}

export interface OrderHost extends OrderParticipant {
  receivingAddress: string | null;
}

export interface OrderParticipant {
  accountNumber: string;
  outgoingAmount: number;
  outgoingAsset: string;
}

export enum PaymentStatus {
  complete = 'complete',
  error = 'error',
  expired = 'expired',
  none = 'none',
  partial = 'partial',
}
