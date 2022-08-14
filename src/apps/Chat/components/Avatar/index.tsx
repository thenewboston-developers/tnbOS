import {SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  displayImage: string;
}

const Avatar: SFC<AvatarProps> = ({className, displayImage}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      <S.Status indicatorColor="#3aa55d" />
    </S.Container>
  );
};

export default Avatar;
