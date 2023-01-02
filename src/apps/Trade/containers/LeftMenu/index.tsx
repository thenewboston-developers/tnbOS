import {SFC} from 'system/types';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.MenuContent />
    </S.Container>
  );
};

export default LeftMenu;
