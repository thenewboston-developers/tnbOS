import React from 'react';

import Amount from 'apps/Trade/components/Amount';
import AssetLogo from 'apps/Trade/components/AssetLogo';
import Button from 'apps/Trade/components/Button';
import User from 'apps/Trade/components/User';
import {Offer, Terms} from 'apps/Trade/types';
import {useNetworkDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

interface RemoteOfferCardProps {
  offer: Offer;
  offerType: OfferType;
  onButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export enum OfferType {
  purchase = 'purchase',
  sale = 'sale',
}

const RemoteOfferCard: SFC<RemoteOfferCardProps> = ({className, offer, offerType, onButtonClick}) => {
  const clientAssetDisplayName = useNetworkDisplayName(offer.clientAsset);

  const terms: Terms = offerType === OfferType.purchase ? offer.purchaseTerms : offer.saleTerms;

  const getButtonText = () => {
    const action = offerType === OfferType.purchase ? 'Sell' : 'Buy';
    return `${action} ${clientAssetDisplayName}`;
  };

  return (
    <S.Container className={className} padding={12}>
      <AssetLogo networkId={offer.clientAsset} />
      <User accountNumber={offer.host} description={offerType === OfferType.purchase ? 'Buyer' : 'Seller'} />
      <Amount
        amount={terms.price}
        amountLabel="Price"
        bottomText={`Limits: ${terms.orderMin.toLocaleString()} - ${terms.orderMax.toLocaleString()} ${clientAssetDisplayName}`}
        networkId={offer.hostAsset}
      />
      <Button onClick={onButtonClick} text={getButtonText()} />
    </S.Container>
  );
};

export default RemoteOfferCard;
