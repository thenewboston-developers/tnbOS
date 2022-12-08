import ArtCard from 'apps/Art/components/ArtCard';
import {SFC} from 'system/types';
import * as S from './Styles';

const Home: SFC = ({className}) => {
  const renderArtCards = () => {
    return (
      <>
        <ArtCard />
        <ArtCard />
        <ArtCard />
        <ArtCard />
        <ArtCard />
      </>
    );
  };

  return (
    <S.Container className={className}>
      <S.ArtCards>{renderArtCards()}</S.ArtCards>
    </S.Container>
  );
};

export default Home;
