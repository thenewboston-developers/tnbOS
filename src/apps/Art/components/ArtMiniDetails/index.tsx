import {SFC} from 'system/types';
import * as S from './Styles';

const ArtMiniDetails: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="art" src="https://i.pinimg.com/474x/a9/e5/60/a9e56077c22bfd00ca63a5e7cacded85.jpg" />
      <S.Right>
        <S.Name>Summer Day</S.Name>
        <S.Description>
          Bacon ipsum dolor amet alcatra drumstick boudin bresaola ham hock tri-tip venison salami.
        </S.Description>
      </S.Right>
    </S.Container>
  );
};

export default ArtMiniDetails;
