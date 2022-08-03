import noop from 'lodash/noop';

import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <h2>Network Manager</h2>
      <S.Button onClick={noop} text="Add Network" />
    </S.Container>
  );
};

export default Top;
