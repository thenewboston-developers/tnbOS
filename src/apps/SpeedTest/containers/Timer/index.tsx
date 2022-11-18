import {SFC} from 'system/types';
import * as S from './Styles';

const Timer: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.TopText>1.2684</S.TopText>
      <S.BottomText>seconds</S.BottomText>
    </S.Container>
  );
};

export default Timer;
