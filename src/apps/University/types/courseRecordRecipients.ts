import {Dict} from 'system/types';

export interface CourseRecordRecipient {
  accountNumber: string;
  delivered: boolean;
  deliveryAttempts: number;
}

export type CourseRecordRecipients = Dict<CourseRecordRecipient>;
