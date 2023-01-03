export interface Transaction {
  amount: number;
  createdDate: string;
  orderId: string | null;
  recipient: string;
  sender: string;
  signature: string;
  transactionFee: number;
  transactionId: string;
}

export enum TransactionPerspective {
  receiver = 'receiver',
  sender = 'sender',
}

export enum TransactionStatus {
  received = 'received',
  sent = 'sent',
}
