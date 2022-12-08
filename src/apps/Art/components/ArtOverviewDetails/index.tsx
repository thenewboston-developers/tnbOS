import Detail from 'apps/Art/components/Detail';
import {SFC} from 'system/types';
import * as S from './Styles';

const ArtOverviewDetails: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.H2>Details</S.H2>
      <S.DetailItems>
        <Detail label="Created" value="11/19/22" />
        <Detail label="Last Updated" value="12/8/22" />
        <Detail label="ID" value="efe2662c-d3e3-4636-9290-12f805b672cc" />
      </S.DetailItems>
    </S.Container>
  );
};

export default ArtOverviewDetails;
