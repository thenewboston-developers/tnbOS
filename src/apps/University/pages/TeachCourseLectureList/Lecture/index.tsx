import {useDispatch} from 'react-redux';
import noop from 'lodash/noop';

import ActionLink from 'apps/University/components/ActionLink';
import PublicationBadge from 'apps/University/components/PublicationBadge';
import {setActivePage, setActiveTeachLectureId} from 'apps/University/store/manager';
import {Lecture as TLecture, Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface LectureProps {
  lecture: TLecture;
}

const Lecture: SFC<LectureProps> = ({lecture}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {description, lectureId, name, publicationStatus, thumbnailUrl} = lecture;

  const handleEditLectureClick = () => {
    dispatch(setActiveTeachLectureId(lectureId));
    dispatch(setActivePage(Page.teachCourseLectureDetails));
  };

  return (
    <>
      <S.Thumbnail alt="thumbnail" onClick={handleEditLectureClick} src={thumbnailUrl} />
      <S.Details>
        <S.Name onClick={handleEditLectureClick}>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Details>
      <S.PublicationStatus>
        <PublicationBadge publicationStatus={publicationStatus} />
      </S.PublicationStatus>
      <S.Actions>
        <ActionLink onClick={handleEditLectureClick}>Edit Lecture</ActionLink>
        <ActionLink onClick={noop}>Delete Lecture</ActionLink>
      </S.Actions>
    </>
  );
};

export default Lecture;
