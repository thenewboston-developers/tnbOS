import {SFC} from 'system/types';
import * as S from './Styles';

const Navigation: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Item isActive={true}>BROWSE</S.Item>
      <S.Item>MY COURSES</S.Item>
    </S.Container>
  );
};

export default Navigation;
