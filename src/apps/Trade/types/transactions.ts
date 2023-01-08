import {Dict, NetworkBlock} from 'system/types';

export interface Transaction extends NetworkBlock {
  networkId: string;
  orderId: string;
}

export enum TransactionPerspective {
  receiver = 'receiver',
  sender = 'sender',
}

export enum TransactionStatus {
  received = 'received',
  sent = 'sent',
}

export type Transactions = Dict<Dict<Dict<Transaction>>>;
