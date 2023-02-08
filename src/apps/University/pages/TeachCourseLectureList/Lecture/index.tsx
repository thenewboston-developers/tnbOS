import {useDispatch} from 'react-redux';

import ActionLink from 'apps/University/components/ActionLink';
import PublicationBadge from 'apps/University/components/PublicationBadge';
import {setSelfLectureRecord, unsetLectureRecord} from 'apps/University/store/lectureRecords';
import {setLecture, unsetLecture} from 'apps/University/store/lectures';
import {setActivePage, setActiveTeachLectureId} from 'apps/University/store/manager';
import {Lecture as TLecture, Page, PublicationStatus} from 'apps/University/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface LectureProps {
  lecture: TLecture;
}

const Lecture: SFC<LectureProps> = ({lecture}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {description, lectureId, name, publicationStatus, thumbnailUrl} = lecture;

  const handleDeleteLectureClick = () => {
    dispatch(unsetLecture(lectureId));
    displayToast(`Lecture deleted`, ToastType.success);
  };

  const handleEditLectureClick = () => {
    dispatch(setActiveTeachLectureId(lectureId));
    dispatch(setActivePage(Page.teachCourseLectureDetails));
  };

  const handlePublicationActionLinkClick = () => {
    let newPublicationStatus = PublicationStatus.draft;

    if (publicationStatus === PublicationStatus.draft) newPublicationStatus = PublicationStatus.published;

    const _lecture = {
      ...lecture,
      modifiedDate: currentSystemDate(),
      publicationStatus: newPublicationStatus,
    };

    dispatch(setLecture(_lecture));

    const {courseId, modifiedDate} = _lecture;

    if (newPublicationStatus === PublicationStatus.published) {
      dispatch(setSelfLectureRecord({courseId, lectureId, modifiedDate}));
    } else if (newPublicationStatus === PublicationStatus.draft) {
      dispatch(unsetLectureRecord({courseId, lectureId}));
    }

    displayToast(`Lecture set to ${newPublicationStatus}`, ToastType.success);
  };

  const renderPublicationActionLink = () => {
    const actionText = publicationStatus === PublicationStatus.draft ? 'Publish' : 'Unpublish';
    const text = `${actionText} Lecture`;
    return <ActionLink onClick={handlePublicationActionLinkClick}>{text}</ActionLink>;
  };

  return (
    <>
      <S.ThumbnailContainer>
        <S.Thumbnail alt="thumbnail" onClick={handleEditLectureClick} src={thumbnailUrl} />
      </S.ThumbnailContainer>
      <S.Details>
        <S.Name onClick={handleEditLectureClick}>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Details>
      <S.PublicationStatus>
        <PublicationBadge publicationStatus={publicationStatus} />
      </S.PublicationStatus>
      <S.Actions>
        <ActionLink onClick={handleEditLectureClick}>Edit Lecture</ActionLink>
        <ActionLink onClick={handleDeleteLectureClick}>Delete Lecture</ActionLink>
        {renderPublicationActionLink()}
      </S.Actions>
    </>
  );
};

export default Lecture;
