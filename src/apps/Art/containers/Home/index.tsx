import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import ArtCard from 'apps/Art/components/ArtCard';
import ArtCardsContainer from 'apps/Art/components/ArtCardsContainer';
import {useValidArtworkAttributes} from 'apps/Art/hooks';
import NetworksEmptyStateGraphic from 'apps/NetworkManager/assets/networks-empty-state.png';
import EmptyPage from 'system/components/EmptyPage';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const Home: SFC = ({className}) => {
  const self = useSelector(getSelf);
  const validArtworkAttributes = useValidArtworkAttributes();

  const othersArtworkAttributes = useMemo(() => {
    return validArtworkAttributes.filter((artworkAttributes) => artworkAttributes.owner !== self.accountNumber);
  }, [self.accountNumber, validArtworkAttributes]);

  const renderArtCards = () => {
    return othersArtworkAttributes.map((artworkAttributes) => (
      <ArtCard artworkAttributes={artworkAttributes} key={artworkAttributes.artworkId} />
    ));
  };

  const renderPageContent = () => {
    if (!!othersArtworkAttributes.length) {
      return <ArtCardsContainer>{renderArtCards()}</ArtCardsContainer>;
    }

    return (
      <EmptyPage
        bottomText="Artwork from connected accounts will appear here."
        graphic={NetworksEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default Home;
