import {Dict} from 'system/types';

export interface ProductRecord {
  productModifiedDates: Dict<string>;
  recordModifiedDate: string;
}

export type ProductRecords = Dict<ProductRecord>;
