import ArtOverview from 'apps/Art/components/ArtOverview';
import ArtOverviewDetails from 'apps/Art/components/ArtOverviewDetails';
import {SFC} from 'system/types';
import * as S from './Styles';

const Details: SFC = ({className}) => {
  const renderHistory = () => {
    return (
      <S.History>
        <S.H2>History</S.H2>
        <S.HistoryTable />
      </S.History>
    );
  };

  return (
    <S.Container className={className}>
      <ArtOverview artOverviewDetails={<ArtOverviewDetails />} />
      {renderHistory()}
    </S.Container>
  );
};

export default Details;
