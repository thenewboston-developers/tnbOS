import TopCard from 'apps/SpeedTest/components/TopCard';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <TopCard />
      <TopCard />
    </S.Container>
  );
};

export default Top;
