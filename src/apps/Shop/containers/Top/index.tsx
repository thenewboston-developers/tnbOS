import DropdownMenu from 'apps/Shop/components/DropdownMenu';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>Left</S.Left>
      <S.Right>
        <DropdownMenu />
      </S.Right>
    </S.Container>
  );
};

export default Top;
