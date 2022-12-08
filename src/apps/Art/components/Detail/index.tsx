import {SFC} from 'system/types';
import * as S from './Styles';

export interface DetailProps {
  label: string;
  value: string;
}

const Detail: SFC<DetailProps> = ({className, label, value}) => {
  return (
    <S.Container className={className}>
      <S.Label>{label}</S.Label>
      <S.Value>{value}</S.Value>
    </S.Container>
  );
};

export default Detail;
