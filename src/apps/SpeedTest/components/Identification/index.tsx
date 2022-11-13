import {SFC} from 'system/types';
import * as S from './Styles';

export interface IdentificationProps {
  bottomText: string;
  displayImage: string;
  topText: string;
}

const Identification: SFC<IdentificationProps> = ({bottomText, className, displayImage, topText}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="identification" src={displayImage} />
      <S.Text>
        <S.TopText>{topText}</S.TopText>
        <S.BottomText>{bottomText}</S.BottomText>
      </S.Text>
    </S.Container>
  );
};

export default Identification;
