import {SFC} from 'system/types';
import * as S from './Styles';

export interface ArtMiniDetailsProps {
  artworkId: string;
  description?: string;
  imageUrl?: string;
  name?: string;
}

const ArtMiniDetails: SFC<ArtMiniDetailsProps> = ({className, description, imageUrl, name}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="art" src={imageUrl} />
      <S.Right>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default ArtMiniDetails;
