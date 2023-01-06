import {TnbKeyPair} from 'shared/types';
import {Dict} from 'system/types';

export interface HoldingAccount extends TnbKeyPair {
  balance: number;
  networkId: string;
  orderId: string;
}

export type HoldingAccounts = Dict<Dict<HoldingAccount>>;
