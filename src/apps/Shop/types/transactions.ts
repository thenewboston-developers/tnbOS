import {Dict, NetworkBlock} from 'system/types';

export interface Transaction extends NetworkBlock {
  networkId: string;
  orderId: string;
}

export type Transactions = Dict<Dict<Dict<Transaction>>>;
