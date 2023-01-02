import Detail from 'apps/Art/components/Detail';
import {useDetailsPageArtwork} from 'apps/Art/hooks';
import {formatDate} from 'apps/Art/utils/dates';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

const ArtOverviewDetails: SFC = ({className}) => {
  const detailsPageArtwork = useDetailsPageArtwork();

  const renderFormattedDate = (date: string | undefined) => {
    if (!date) return '-';
    return formatDate(date);
  };

  return (
    <S.Container className={className}>
      <S.H2>Details</S.H2>
      <S.DetailItems>
        <Detail label="Artwork ID" value={truncate(detailsPageArtwork.attributes.artworkId || '-', 48)} />
        <Detail label="In Transfer" value={detailsPageArtwork.attributes.inTransfer ? 'True' : 'False'} />
        <Detail label="Created" value={renderFormattedDate(detailsPageArtwork.attributes.createdDate)} />
        <Detail label="Last Updated" value={renderFormattedDate(detailsPageArtwork.attributes.modifiedDate)} />
      </S.DetailItems>
    </S.Container>
  );
};

export default ArtOverviewDetails;
