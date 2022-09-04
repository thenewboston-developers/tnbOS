import {Dict} from 'system/types/generic';

export enum DeliveryStatus {
  error = 'error',
  failed = 'failed',
  pending = 'pending',
  received = 'received',
}

export type DeliveryStatuses = Dict<DeliveryStatus>;
