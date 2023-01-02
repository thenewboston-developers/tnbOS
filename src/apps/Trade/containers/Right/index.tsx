import {SFC} from 'system/types';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.MainContent />
    </S.Container>
  );
};

export default Right;
