import {Dict} from 'system/types';

export interface OrderError {
  createdDate: string;
  creator: string;
  message: string;
  orderErrorId: string;
  orderId: string;
}

export type OrderErrors = Dict<Dict<OrderError>>;
