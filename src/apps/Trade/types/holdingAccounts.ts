import {TnbKeyPair} from 'shared/types';
import {Dict} from 'system/types';

export interface HoldingAccount extends TnbKeyPair {
  balance: number;
  orderId: string;
}

export type HoldingAccounts = Dict<HoldingAccount>;
