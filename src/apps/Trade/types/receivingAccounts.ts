import {TnbKeyPair} from 'shared/types';
import {Dict} from 'system/types';

export interface ReceivingAccount extends TnbKeyPair {
  fundsTransferredOut: boolean;
  orderId: string;
}

export type ReceivingAccounts = Dict<ReceivingAccount>;
