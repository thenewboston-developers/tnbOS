import {Lecture} from 'apps/University/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface LecturePreviewProps {
  lecture: Lecture;
}

const LecturePreview: SFC<LecturePreviewProps> = ({className, lecture}) => {
  return (
    <S.Container className={className}>
      <S.Thumbnail thumbnailUrl={lecture.thumbnailUrl} />
      <S.Name>{lecture.name}</S.Name>
      <S.Description>{lecture.description}</S.Description>
    </S.Container>
  );
};

export default LecturePreview;
