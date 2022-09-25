import {Dict} from 'system/types/generic';

export interface Message {
  content: string;
  createdDate: string;
  messageId: string;
  modifiedDate: string;
  recipient: string;
  sender: string;
  transfer: Transfer | null;
}

export type Messages = Dict<Message>;

export interface Transfer {
  amount: number;
  networkId: string;
}
