import {ActivationStatus} from 'apps/Shop/types/activationStatus';
import {Dict} from 'system/types';

export interface Product {
  activationStatus: ActivationStatus;
  createdDate: string;
  description: string;
  imageUrl: string;
  modifiedDate: string;
  name: string;
  productId: string;
  seller: string;
}

export type Products = Dict<Product>;
