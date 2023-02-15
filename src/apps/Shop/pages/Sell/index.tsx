import {SFC} from 'system/types';
import * as S from './Styles';

const Sell: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.LeftMenu />
      <S.Right />
    </S.Container>
  );
};

export default Sell;
