import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ArtCard from 'apps/Art/components/ArtCard';
import ArtCardsContainer from 'apps/Art/components/ArtCardsContainer';
import {useValidArtworkAttributes} from 'apps/Art/hooks';
import {setActivePage, setCanvasArtworkId} from 'apps/Art/store/manager';
import {getCanvasArtworkId} from 'apps/Art/selectors/state';
import {Page} from 'apps/Art/types';
import NetworksEmptyStateGraphic from 'apps/NetworkManager/assets/networks-empty-state.png';
import EmptyPage from 'system/components/EmptyPage';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const MyCollection: SFC = ({className}) => {
  const canvasArtworkId = useSelector(getCanvasArtworkId);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const validArtworkAttributes = useValidArtworkAttributes();

  const handleCreateArtworkClick = () => {
    if (canvasArtworkId) {
      dispatch(setCanvasArtworkId(null));
    }

    dispatch(setActivePage(Page.canvas));
  };

  const myArtworkAttributes = useMemo(() => {
    return validArtworkAttributes.filter((artworkAttributes) => artworkAttributes.owner === self.accountNumber);
  }, [self.accountNumber, validArtworkAttributes]);

  const renderArtCards = () => {
    return myArtworkAttributes.map((artworkAttributes) => (
      <ArtCard artworkAttributes={artworkAttributes} key={artworkAttributes.artworkId} />
    ));
  };

  const renderPageContent = () => {
    if (!!myArtworkAttributes.length) {
      return <ArtCardsContainer>{renderArtCards()}</ArtCardsContainer>;
    }

    return (
      <EmptyPage
        actionText="Create artwork."
        bottomText="Artwork that you own will appear here."
        graphic={NetworksEmptyStateGraphic}
        onActionTextClick={handleCreateArtworkClick}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default MyCollection;
