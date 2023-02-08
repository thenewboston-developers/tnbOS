import {SFC} from 'system/types';
import * as S from './Styles';

export interface LeftMenuStickerProps {
  bottomText: string;
  thumbnailUrl: string;
  topText: string;
}

const LeftMenuSticker: SFC<LeftMenuStickerProps> = ({bottomText, thumbnailUrl, topText}) => {
  return (
    <>
      <S.Thumbnail thumbnailUrl={thumbnailUrl} />
      <S.TextContainer>
        <S.TopText>{topText}</S.TopText>
        <S.BottomText>{bottomText}</S.BottomText>
      </S.TextContainer>
    </>
  );
};

export default LeftMenuSticker;
