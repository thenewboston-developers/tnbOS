import ArtOverview from 'apps/Art/components/ArtOverview';
import {SFC} from 'system/types';
import * as S from './Styles';

const Details: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <ArtOverview />
    </S.Container>
  );
};

export default Details;
