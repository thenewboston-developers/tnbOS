import {SFC} from 'system/types';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <h1>Left menu</h1>
    </S.Container>
  );
};

export default LeftMenu;
