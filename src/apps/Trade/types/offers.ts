export interface Offer {
  clientAsset: string;
  host: string;
  hostAsset: string;
  purchaseTerms: Terms;
  saleTerms: Terms;
}

export interface Terms {
  enabled: boolean;
  orderMax: number;
  orderMin: number;
  price: number;
}
