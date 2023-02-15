import {TnbKeyPair} from 'shared/types';
import {Dict} from 'system/types';

export interface ReceivingAccount extends TnbKeyPair {
  fundsTransferredOut: boolean;
  networkId: string;
  orderId: string;
}

export type ReceivingAccounts = Dict<Dict<ReceivingAccount>>;
