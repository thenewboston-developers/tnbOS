import SpacedItems from 'apps/SpeedTest/components/SpacedItems';
import {SFC} from 'system/types';
import * as S from './Styles';

const TopCard: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Heading>Heading</S.Heading>
      <S.Content>
        <SpacedItems />
      </S.Content>
    </S.Container>
  );
};

export default TopCard;
