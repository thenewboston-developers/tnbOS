import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>Left</S.Left>
      <S.Right>
        <S.Img alt="avatar" src="https://avatars.githubusercontent.com/u/8547538?v=4" />
      </S.Right>
    </S.Container>
  );
};

export default Top;
