import {Offer} from 'apps/Trade/types';

export const getOfferKey = (offer: Offer): string => {
  const {clientAsset, host, hostAsset} = offer;
  return `${clientAsset}-${host}-${hostAsset}`;
};
