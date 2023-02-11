import {Dict} from 'system/types';

export interface Address {
  address1: string;
  address2: string;
  addressId: string;
  city: string;
  country: string;
  fullName: string;
  state: string;
  zipCode: string;
}

export type Addresses = Dict<Address>;
