import {SFC} from 'system/types';
import * as S from './Styles';

const Identification: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="identification" src="https://avatars.githubusercontent.com/u/12706692?s=200&v=4" />
      <S.Text>
        <S.TopText>Top text</S.TopText>
        <S.BottomText>Bottom text</S.BottomText>
      </S.Text>
    </S.Container>
  );
};

export default Identification;
