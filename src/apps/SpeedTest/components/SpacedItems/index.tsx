import {mdiPencil} from '@mdi/js';

import Identification from 'apps/SpeedTest/components/Identification';
import {SFC} from 'system/types';
import * as S from './Styles';

const SpacedItems: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>
        <Identification />
      </S.Left>
      <S.Right>
        <S.Icon path={mdiPencil} size="28px" />
      </S.Right>
    </S.Container>
  );
};

export default SpacedItems;
