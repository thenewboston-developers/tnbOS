import {useDispatch} from 'react-redux';

import ActionLink from 'apps/University/components/ActionLink';
import PublicationBadge from 'apps/University/components/PublicationBadge';
import {setCourseRecord, unsetCourseRecord} from 'apps/University/store/courseRecords';
import {setCourse, unsetCourse} from 'apps/University/store/courses';
import {unsetCourseLectures} from 'apps/University/store/lectures';
import {setActivePage, setActiveTeachCourseId} from 'apps/University/store/manager';
import {Course as TCourse, Page, PublicationStatus} from 'apps/University/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface CourseProps {
  course: TCourse;
}

const Course: SFC<CourseProps> = ({course}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {courseId, description, name, publicationStatus, thumbnailUrl} = course;

  const handleDeleteCourseClick = () => {
    dispatch(unsetCourse(courseId));
    dispatch(unsetCourseLectures(courseId));
    dispatch(unsetCourseRecord({courseId, instructor: course.instructor}));
    displayToast(`Course deleted`, ToastType.success);
  };

  const handleEditCourseClick = () => {
    dispatch(setActiveTeachCourseId(courseId));
    dispatch(setActivePage(Page.teachCourseDetails));
  };

  const handlePublicationActionLinkClick = () => {
    let newPublicationStatus = PublicationStatus.draft;

    if (publicationStatus === PublicationStatus.draft) newPublicationStatus = PublicationStatus.published;

    const _course = {
      ...course,
      modifiedDate: currentSystemDate(),
      publicationStatus: newPublicationStatus,
    };

    dispatch(setCourse(_course));

    if (newPublicationStatus === PublicationStatus.published) {
      dispatch(setCourseRecord(_course));
    } else if (newPublicationStatus === PublicationStatus.draft) {
      dispatch(unsetCourseRecord({courseId, instructor: _course.instructor}));
    }

    displayToast(`Course set to ${newPublicationStatus}`, ToastType.success);
  };

  const renderPublicationActionLink = () => {
    const actionText = publicationStatus === PublicationStatus.draft ? 'Publish' : 'Unpublish';
    const text = `${actionText} Course`;
    return <ActionLink onClick={handlePublicationActionLinkClick}>{text}</ActionLink>;
  };

  return (
    <>
      <S.Thumbnail alt="thumbnail" onClick={handleEditCourseClick} src={thumbnailUrl} />
      <S.Details>
        <S.Name onClick={handleEditCourseClick}>{name}</S.Name>
        <S.Description>{truncate(description, 200)}</S.Description>
      </S.Details>
      <S.PublicationStatus>
        <PublicationBadge publicationStatus={publicationStatus} />
      </S.PublicationStatus>
      <S.Actions>
        <ActionLink onClick={handleEditCourseClick}>Edit Course</ActionLink>
        <ActionLink onClick={handleDeleteCourseClick}>Delete Course</ActionLink>
        {renderPublicationActionLink()}
      </S.Actions>
    </>
  );
};

export default Course;
