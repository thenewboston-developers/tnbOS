import {Dict} from 'system/types';

export interface ProductRecordRecipient {
  accountNumber: string;
  delivered: boolean;
  deliveryAttempts: number;
}

export type ProductRecordRecipients = Dict<ProductRecordRecipient>;
