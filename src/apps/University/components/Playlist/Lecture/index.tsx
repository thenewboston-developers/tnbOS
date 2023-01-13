import {useDispatch} from 'react-redux';

import {setActiveLearnLectureId, setActiveLearnPage} from 'apps/University/store/manager';
import {LearnPage, Lecture as TLecture} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface LectureProps {
  displayDescription: boolean;
  lecture: TLecture;
}

const Lecture: SFC<LectureProps> = ({className, displayDescription, lecture}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {description, lectureId, name, position, thumbnailUrl} = lecture;

  const handleClick = () => {
    dispatch(setActiveLearnLectureId(lectureId));
    dispatch(setActiveLearnPage(LearnPage.courseLecture));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Position>{position}</S.Position>
      <S.Thumbnail alt="thumbnail" src={thumbnailUrl} />
      <S.Details>
        <S.Name>{name}</S.Name>
        {displayDescription && <S.Description>{description}</S.Description>}
      </S.Details>
    </S.Container>
  );
};

export default Lecture;
