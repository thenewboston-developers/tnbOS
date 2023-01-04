import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {mdiPlus} from '@mdi/js';

import Button from 'apps/Trade/components/Button';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import PageHeader from 'apps/Trade/components/PageHeader';
import {getActiveNetworkId, getOffers} from 'apps/Trade/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import OffersEmptyStateGraphic from './assets/offers-empty-state.png';
import * as S from './Styles';

const Offers: SFC = ({className}) => {
  const [selectTickerModalIsOpen, toggleSelectTickerModal] = useToggle(false);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const offers = useSelector(getOffers);

  const activeNetworksOffers = useMemo(() => {
    return offers.filter(({hostAsset}) => activeNetworkId === hostAsset);
  }, [activeNetworkId, offers]);

  const renderEmptyPage = () => {
    return (
      <EmptyPage
        actionText="Add offer terms."
        bottomText="Offer terms allow for automated trading."
        graphic={OffersEmptyStateGraphic}
        onActionTextClick={toggleSelectTickerModal}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    if (!activeNetworksOffers.length) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader rightContent={renderRightHeaderContent()} title="Offers" />
        {/*{renderOfferCards()}*/}
      </S.Container>
    );
  };

  const renderRightHeaderContent = () => {
    // if (!availableCryptos.length) return null;
    return <Button iconLeft={mdiPlus} onClick={toggleSelectTickerModal} text="Offer Terms" />;
  };

  return (
    <>
      {renderPageContent()}
    </>
  );
};

export default Offers;
