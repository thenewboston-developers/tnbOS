import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ThumbnailProps {
  onClick?: GenericVoidFunction;
  thumbnailUrl: string;
}

const Thumbnail: SFC<ThumbnailProps> = ({className, onClick, thumbnailUrl}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Img alt="thumbnail" src={thumbnailUrl} />
    </S.Container>
  );
};

export default Thumbnail;
