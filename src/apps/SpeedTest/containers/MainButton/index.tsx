import {SFC} from 'system/types';
import * as S from './Styles';

const MainButton: SFC = ({className}) => {
  return <S.Container className={className}>GO</S.Container>;
};

export default MainButton;
