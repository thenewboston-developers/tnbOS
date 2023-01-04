import {Offer} from 'apps/Trade/types/offers';

export enum TradeFn {
  setOffers = 'setOffers',
}

export interface SetOffersParams {
  modifiedDate: string;
  offers: Offer[];
}
