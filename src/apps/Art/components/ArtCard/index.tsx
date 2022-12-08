import AccountLabel from 'apps/Art/components/AccountLabel';
import {SFC} from 'system/types';
import * as S from './Styles';

const ArtCard: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="art" src="https://i.pinimg.com/474x/a9/e5/60/a9e56077c22bfd00ca63a5e7cacded85.jpg" />
      <S.Bottom>
        <S.Name>Name of Artwork</S.Name>
        <AccountLabel />
        <AccountLabel />
      </S.Bottom>
    </S.Container>
  );
};

export default ArtCard;
