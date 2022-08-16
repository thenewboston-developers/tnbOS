import {colors} from 'apps/Chat/styles';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  displayImage: string;
}

const Avatar: SFC<AvatarProps> = ({className, displayImage}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      <S.Status indicatorColor={colors.palette.green['300']} />
    </S.Container>
  );
};

export default Avatar;
