import {Dict} from 'system/types';

export interface OffersSync {
  modifiedDate: string | null;
  recipients: Dict<SyncRecipient>;
}

export interface SyncRecipient {
  accountNumber: string;
  delivered: boolean;
  deliveryAttempts: number;
}
