import {Id} from './generic';

export interface Block extends UnsignedBlock {
  signature: string;
}

export interface UnsignedBlock extends Id {
  amount: number;
  payload: any;
  recipient: string;
  sender: string;
  transaction_fee: number;
}
