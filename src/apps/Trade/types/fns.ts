import {Offer} from 'apps/Trade/types/offers';

export enum TradeFn {
  setOffers = 'setOffers',
  setOffersReceipt = 'setOffersReceipt',
}

export interface SetOffersParams {
  modifiedDate: string;
  offers: Offer[];
}

export interface SetOffersReceiptParams {
  modifiedDate: string;
}
