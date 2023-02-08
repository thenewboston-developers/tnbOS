import {SFC} from 'system/types';
import * as S from './Styles';

export interface ThumbnailMiniProps {
  thumbnailUrl: string;
}

const ThumbnailMini: SFC<ThumbnailMiniProps> = ({className, thumbnailUrl}) => {
  return (
    <S.Container className={className}>
      <S.Thumbnail alt="thumbnail" src={thumbnailUrl} />
    </S.Container>
  );
};

export default ThumbnailMini;
