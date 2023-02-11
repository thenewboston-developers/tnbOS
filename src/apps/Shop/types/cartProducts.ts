import {Dict} from 'system/types';

export interface CartProduct {
  createdDate: string;
  productId: string;
}

export type CartProducts = Dict<CartProduct>;
