import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyActiveNetworkPage from 'apps/Trade/components/EmptyActiveNetworkPage';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import PageHeader from 'apps/Trade/components/PageHeader';
import RemoteOfferCard, {OfferType} from 'apps/Trade/components/RemoteOfferCard';
import {getActiveNetworkId, getRemoteOffers} from 'apps/Trade/selectors/state';
import {getOfferKey} from 'apps/Trade/utils/offers';
import {useOnlineAccountNumbers} from 'system/hooks';
import {SFC} from 'system/types';
import SellEmptyStateGraphic from './assets/sell-empty-state.png';
import * as S from './Styles';

const Sell: SFC = ({className}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const onlineAccountNumbers = useOnlineAccountNumbers();
  const remoteOffers = useSelector(getRemoteOffers);

  const offers = useMemo(() => {
    return remoteOffers
      .filter(({host}) => onlineAccountNumbers.includes(host))
      .filter(({hostAsset}) => hostAsset === activeNetworkId)
      .filter(({purchaseTerms}) => purchaseTerms.enabled);
  }, [activeNetworkId, onlineAccountNumbers, remoteOffers]);

  const renderEmptyPage = () => {
    if (!activeNetworkId) return <EmptyActiveNetworkPage />;

    return (
      <EmptyPage
        bottomText="Sell offers from contacts will appear here."
        graphic={SellEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    if (!offers.length) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader title="Sell" />
        {renderRemoteOfferCards()}
      </S.Container>
    );
  };

  const renderRemoteOfferCards = () => {
    const sortedOffers = orderBy(offers, ['hostAsset', 'purchaseTerms.price'], ['asc', 'desc']);
    const offerCards = sortedOffers.map((offer) => (
      <RemoteOfferCard key={getOfferKey(offer)} offer={offer} offerType={OfferType.purchase} onButtonClick={() => {}} />
    ));
    return <>{offerCards}</>;
  };

  return renderPageContent();
};

export default Sell;
