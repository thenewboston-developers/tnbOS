import {SFC} from 'system/types';
import * as S from './Styles';

const AccountLabel: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="art" src="https://avatars.githubusercontent.com/u/8547538?v=4" />
      <S.Right>
        <S.TopText>Creator</S.TopText>
        <S.BottomText>Bucky</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default AccountLabel;
