import {SFC} from 'system/types';
import * as S from './Styles';

const AccountLabel: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="art" src="https://i.pinimg.com/474x/a9/e5/60/a9e56077c22bfd00ca63a5e7cacded85.jpg" />
      <S.Right>
        <S.TopText>Creator</S.TopText>
        <S.BottomText>Bucky</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default AccountLabel;
