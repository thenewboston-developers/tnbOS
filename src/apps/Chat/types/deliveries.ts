import {Dict} from 'system/types/generic';

export interface Delivery {
  attempts: number;
  status: DeliveryStatus;
}

export enum DeliveryStatus {
  error = 'error',
  failed = 'failed',
  pending = 'pending',
  received = 'received',
}

export type Deliveries = Dict<Delivery>;
