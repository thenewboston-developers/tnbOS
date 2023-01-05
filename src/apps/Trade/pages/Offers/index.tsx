import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import sortBy from 'lodash/sortBy';
import {mdiChevronRight, mdiPlus} from '@mdi/js';

import Button from 'apps/Trade/components/Button';
import EmptyActiveNetworkPage from 'apps/Trade/components/EmptyActiveNetworkPage';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import OfferCard from 'apps/Trade/components/OfferCard';
import PageHeader from 'apps/Trade/components/PageHeader';
import {useAvailableClientAssets} from 'apps/Trade/hooks';
import OfferModal from 'apps/Trade/modals/OfferModal';
import SelectNetworkModal from 'apps/Trade/modals/SelectNetworkModal';
import {getActiveNetworkId, getOffers} from 'apps/Trade/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import OffersEmptyStateGraphic from './assets/offers-empty-state.png';
import * as S from './Styles';

const Offers: SFC = ({className}) => {
  const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(null);
  const [selectNetworkModalIsOpen, toggleSelectNetworkModal] = useToggle(false);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const availableClientAssets = useAvailableClientAssets();
  const offers = useSelector(getOffers);

  const activeNetworksOffers = useMemo(() => {
    return offers.filter(({hostAsset}) => activeNetworkId === hostAsset);
  }, [activeNetworkId, offers]);

  const handleOfferModalClose = () => {
    setSelectedNetworkId(null);
  };

  const handleSelectNetworkModalSubmit = (networkId: string) => {
    setSelectedNetworkId(networkId);
    toggleSelectNetworkModal();
  };

  const renderEmptyPage = () => {
    if (!activeNetworkId) return <EmptyActiveNetworkPage />;

    return (
      <EmptyPage
        actionText="Add offer terms."
        bottomText="Offer terms allow for automated trading."
        graphic={OffersEmptyStateGraphic}
        onActionTextClick={toggleSelectNetworkModal}
        topText="Nothing here!"
      />
    );
  };

  const renderOfferCards = () => {
    const sortedOffers = sortBy(activeNetworksOffers, ['asset']);
    return sortedOffers.map((offer) => <OfferCard key={offer.clientAsset} offer={offer} />);
  };

  const renderPageContent = () => {
    if (!activeNetworksOffers.length) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader rightContent={renderRightHeaderContent()} title="Offers" />
        {renderOfferCards()}
      </S.Container>
    );
  };

  const renderRightHeaderContent = () => {
    if (!availableClientAssets.length) return null;
    return <Button iconLeft={mdiPlus} onClick={toggleSelectNetworkModal} text="Offer Terms" />;
  };

  return (
    <>
      {renderPageContent()}
      {selectNetworkModalIsOpen ? (
        <SelectNetworkModal
          buttonText="Next"
          close={toggleSelectNetworkModal}
          handleSelectNetworkModalSubmit={handleSelectNetworkModalSubmit}
          header="Add Offer Terms"
          iconRight={mdiChevronRight}
          networkIds={availableClientAssets}
        />
      ) : null}
      {selectedNetworkId ? <OfferModal clientAsset={selectedNetworkId} close={handleOfferModalClose} /> : null}
    </>
  );
};

export default Offers;
