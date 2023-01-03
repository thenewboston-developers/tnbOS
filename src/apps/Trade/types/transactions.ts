export interface Transaction {
  amount: number;
  createdDate: string;
  isConfirmed: boolean;
  orderId?: string;
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
  receiving = 'receiving',
  sending = 'sending',
  sent = 'sent',
}
