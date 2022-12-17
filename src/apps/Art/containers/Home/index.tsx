import ArtCard from 'apps/Art/components/ArtCard';
import ArtCardsContainer from 'apps/Art/components/ArtCardsContainer';
import {useValidArtworkAttributes} from 'apps/Art/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Home: SFC = ({className}) => {
  const validArtworkAttributes = useValidArtworkAttributes();

  const renderArtCards = () => {
    return validArtworkAttributes.map((artworkAttributes) => (
      <ArtCard artworkAttributes={artworkAttributes} key={artworkAttributes.artworkId} />
    ));
  };

  return (
    <S.Container className={className}>
      <ArtCardsContainer>{renderArtCards()}</ArtCardsContainer>
    </S.Container>
  );
};

export default Home;
