import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import ArtCard from 'apps/Art/components/ArtCard';
import ArtCardsContainer from 'apps/Art/components/ArtCardsContainer';
import {useValidArtworkAttributes} from 'apps/Art/hooks';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const MyCollection: SFC = ({className}) => {
  const self = useSelector(getSelf);
  const validArtworkAttributes = useValidArtworkAttributes();

  const myArtworkAttributes = useMemo(() => {
    return validArtworkAttributes.filter((artworkAttributes) => artworkAttributes.owner === self.accountNumber);
  }, [self.accountNumber, validArtworkAttributes]);

  const renderArtCards = () => {
    return myArtworkAttributes.map((artworkAttributes) => (
      <ArtCard artworkAttributes={artworkAttributes} key={artworkAttributes.artworkId} />
    ));
  };

  return (
    <S.Container className={className}>
      <ArtCardsContainer>{renderArtCards()}</ArtCardsContainer>
    </S.Container>
  );
};

export default MyCollection;
