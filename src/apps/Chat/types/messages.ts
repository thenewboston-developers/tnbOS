import {Account, Dict, Network} from 'system/types';

export interface Message {
  attachedAccounts: Account[];
  attachedNetworks: Network[];
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
