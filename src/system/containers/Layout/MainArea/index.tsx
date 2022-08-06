import {Apps} from 'apps/registry';
import {SFC} from 'system/types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Apps />
    </S.Container>
  );
};

export default MainArea;
