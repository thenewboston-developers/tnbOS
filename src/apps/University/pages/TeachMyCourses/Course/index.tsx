import {useDispatch} from 'react-redux';

import ActionLink from 'apps/University/components/ActionLink';
import PublicationBadge from 'apps/University/components/PublicationBadge';
import {setActivePage, setActiveTeachCourseId} from 'apps/University/store/manager';
import {Course as TCourse, Page} from 'apps/University/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {shortDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface CourseProps {
  course: TCourse;
}

const Course: SFC<CourseProps> = ({course}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {courseId, createdDate, description, name, publicationStatus, thumbnailUrl} = course;

  const handleDeleteCourseClick = () => {
    displayToast(`Course deleted`, ToastType.success);
  };

  const handleEditCourseClick = () => {
    dispatch(setActiveTeachCourseId(courseId));
    dispatch(setActivePage(Page.teachCourseDetails));
  };

  const handleUnpublishCourseClick = () => {
    displayToast(`Course set to draft`, ToastType.success);
  };

  return (
    <>
      <S.Thumbnail alt="thumbnail" onClick={handleEditCourseClick} src={thumbnailUrl} />
      <S.Details>
        <S.Name onClick={handleEditCourseClick}>{name}</S.Name>
        <S.Description>{truncate(description, 200)}</S.Description>
      </S.Details>
      <S.CreatedDate>{shortDate(createdDate, false)}</S.CreatedDate>
      <S.PublicationStatus>
        <PublicationBadge publicationStatus={publicationStatus} />
      </S.PublicationStatus>
      <S.Actions>
        <ActionLink onClick={handleEditCourseClick}>Edit Course</ActionLink>
        <ActionLink onClick={handleDeleteCourseClick}>Delete Course</ActionLink>
        <ActionLink onClick={handleUnpublishCourseClick}>Unpublish Course</ActionLink>
      </S.Actions>
    </>
  );
};

export default Course;
