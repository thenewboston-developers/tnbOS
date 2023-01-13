import {Lecture as TLecture} from 'apps/University/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface LectureProps {
  lecture: TLecture;
}

const Lecture: SFC<LectureProps> = ({className, lecture}) => {
  const {description, name, position, thumbnailUrl} = lecture;

  return (
    <S.Container className={className}>
      <S.Position>{position}</S.Position>
      <S.Thumbnail alt="thumbnail" src={thumbnailUrl} />
      <S.Details>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Details>
    </S.Container>
  );
};

export default Lecture;
