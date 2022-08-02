import {SFC} from 'system/types';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.MainArea />
      <S.Toolbar />
    </S.Container>
  );
};

export default Layout;
