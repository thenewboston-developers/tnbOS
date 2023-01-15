import {useDispatch} from 'react-redux';

import {setActiveLearnLectureId, setActivePage} from 'apps/University/store/manager';
import {Lecture as TLecture, Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface LectureProps {
  lecture: TLecture;
}

const Lecture: SFC<LectureProps> = ({className, lecture}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {description, lectureId, name, position, thumbnailUrl} = lecture;

  const handleClick = () => {
    dispatch(setActiveLearnLectureId(lectureId));
    dispatch(setActivePage(Page.learnCourseLecture));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
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
