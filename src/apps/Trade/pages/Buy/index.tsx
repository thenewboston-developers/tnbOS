import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyActiveNetworkPage from 'apps/Trade/components/EmptyActiveNetworkPage';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import PageHeader from 'apps/Trade/components/PageHeader';
import RemoteOfferCard, {OfferType} from 'apps/Trade/components/RemoteOfferCard';
import {getActiveNetworkId, getRemoteOffers} from 'apps/Trade/selectors/state';
import {getOfferKey} from 'apps/Trade/utils/offers';
import {SFC} from 'system/types';
import BuyEmptyStateGraphic from './assets/buy-empty-state.png';
import * as S from './Styles';

const Buy: SFC = ({className}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const remoteOffers = useSelector(getRemoteOffers);

  const offers = useMemo(() => {
    // TODO: Host must be online
    return remoteOffers
      .filter(({hostAsset}) => hostAsset === activeNetworkId)
      .filter(({saleTerms}) => saleTerms.enabled);
  }, [activeNetworkId, remoteOffers]);

  const renderEmptyPage = () => {
    if (!activeNetworkId) return <EmptyActiveNetworkPage />;
    return (
      <EmptyPage
        bottomText="Buy offers from contacts will appear here."
        graphic={BuyEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    if (!offers.length) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader title="Buy" />
        {renderRemoteOfferCards()}
      </S.Container>
    );
  };

  const renderRemoteOfferCards = () => {
    const sortedOffers = orderBy(offers, ['hostAsset', 'saleTerms.price']);
    const offerCards = sortedOffers.map((offer) => (
      <RemoteOfferCard key={getOfferKey(offer)} offer={offer} offerType={OfferType.sale} onButtonClick={() => {}} />
    ));
    return <>{offerCards}</>;
  };

  return renderPageContent();
};

export default Buy;
