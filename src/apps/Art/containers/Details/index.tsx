import ArtOverview from 'apps/Art/components/ArtOverview';
import {useDetailsPageArtwork} from 'apps/Art/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Details: SFC = ({className}) => {
  const detailsPageArtwork = useDetailsPageArtwork();

  const renderHistory = () => {
    const {artworkId} = detailsPageArtwork.attributes;

    if (!artworkId) return;

    return (
      <S.History>
        <S.H2>Block History</S.H2>
        <S.HistoryTable artworkId={artworkId} />
      </S.History>
    );
  };

  return (
    <S.Container className={className}>
      <ArtOverview
        creator={detailsPageArtwork.attributes.creator}
        description={detailsPageArtwork.attributes.description}
        imageUrl={detailsPageArtwork.attributes.imageUrl}
        name={detailsPageArtwork.attributes.name}
        owner={detailsPageArtwork.attributes.owner}
      />
      {renderHistory()}
    </S.Container>
  );
};

export default Details;
