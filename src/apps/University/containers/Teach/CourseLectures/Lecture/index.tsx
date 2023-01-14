import {useDispatch} from 'react-redux';

import {setActiveTeachLectureId, setActiveTeachPage} from 'apps/University/store/manager';
import {Lecture as TLecture, TeachPage} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface LectureProps {
  lecture: TLecture;
}

const Lecture: SFC<LectureProps> = ({className, lecture}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {description, lectureId, name, thumbnailUrl} = lecture;

  const handleClick = () => {
    dispatch(setActiveTeachLectureId(lectureId));
    dispatch(setActiveTeachPage(TeachPage.courseLectureDetails));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Thumbnail alt="thumbnail" src={thumbnailUrl} />
      <S.Details>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Details>
    </S.Container>
  );
};

export default Lecture;