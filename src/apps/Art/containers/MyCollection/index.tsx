import ArtCard from 'apps/Art/components/ArtCard';
import ArtCardsContainer from 'apps/Art/components/ArtCardsContainer';
import {SFC} from 'system/types';
import * as S from './Styles';

const MyCollection: SFC = ({className}) => {
  const renderArtCards = () => {
    return (
      <>
        <ArtCard />
        <ArtCard />
      </>
    );
  };

  return (
    <S.Container className={className}>
      <ArtCardsContainer>{renderArtCards()}</ArtCardsContainer>
    </S.Container>
  );
};

export default MyCollection;
