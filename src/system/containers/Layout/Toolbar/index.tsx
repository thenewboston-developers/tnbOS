import {SFC} from 'system/types';
import Left from './Left';
import Right from './Right';
import * as S from './Styles';

const Toolbar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Left />
      <Right />
    </S.Container>
  );
};

export default Toolbar;
