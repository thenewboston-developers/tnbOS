import {TnbKeyPair} from 'shared/types';

export interface ReceivingAccount extends TnbKeyPair {
  fundsTransferredOut: boolean;
  orderId: string;
}
