import {mdiCircle} from '@mdi/js';

import {SFC} from 'system/types';
import * as S from './Styles';

const ConnectionStatus: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Icon path={mdiCircle} size="14px" />
      <S.Text>Connected</S.Text>
    </S.Container>
  );
};

export default ConnectionStatus;
