import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getLectureRecordBlock} from 'apps/University/blocks';
import {ButtonColor} from 'apps/University/components/Button';
import {setCourse} from 'apps/University/store/courses';
import {setLectureList} from 'apps/University/store/lectures';
import {useActiveLearnCourse, useCourseLectures, useIsSelfEnrolled} from 'apps/University/hooks';
import {setEnrollment, unsetEnrollment} from 'apps/University/store/enrollments';
import {setActivePage, setActiveTeachCourseId} from 'apps/University/store/manager';
import {Course, Lecture, Page, PublicationStatus} from 'apps/University/types';
import {getBalances, getNetworkAccountOnlineStatuses, getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';
import {displayErrorToast, displayToast} from 'system/utils/toast';
import {generateNetworkUUID} from 'system/utils/uuid';
import * as S from './Styles';

const LearnCourseHome: SFC = ({className}) => {
  const [lectureRecordRequested, setLectureRecordRequested] = useState<boolean>(false);
  const balances = useSelector(getBalances);
  const course = useActiveLearnCourse();
  const courseLectures = useCourseLectures(course?.courseId);
  const dispatch = useDispatch<AppDispatch>();
  const isSelfEnrolled = useIsSelfEnrolled(course?.courseId);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const self = useSelector(getSelf);

  useEffect(() => {
    if (!course || lectureRecordRequested) return;
    setLectureRecordRequested(true);

    (async () => {
      try {
        const recipient = course.instructor;

        const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
          balances,
          networkAccountOnlineStatuses,
          recipient,
        });

        if (!recipientsDefaultNetworkId) return;

        await getLectureRecordBlock({
          networkId: recipientsDefaultNetworkId,
          params: {
            courseId: course.courseId,
          },
          recipient,
        });
      } catch (error) {
        displayErrorToast('Error requesting the lecture record');
      }
    })();
  }, [balances, course, lectureRecordRequested, networkAccountOnlineStatuses]);

  const cloneCourseLectures = (courseId: string) => {
    const lectureList: Lecture[] = courseLectures.map((lecture) => {
      const lectureId = generateNetworkUUID();
      const now = currentSystemDate();

      return {
        ...lecture,
        courseId,
        createdDate: now,
        lectureId,
        modifiedDate: now,
        publicationStatus: PublicationStatus.draft,
      };
    });

    dispatch(setLectureList(lectureList));
  };

  const handleCloneCourseClick = () => {
    const courseId = generateNetworkUUID();
    const now = currentSystemDate();

    const _course: Course = {
      ...course!,
      courseId,
      createdDate: now,
      instructor: self.accountNumber,
      modifiedDate: now,
      publicationStatus: PublicationStatus.draft,
    };

    dispatch(setCourse(_course));
    cloneCourseLectures(courseId);
    dispatch(setActiveTeachCourseId(courseId));
    dispatch(setActivePage(Page.teachCourseDetails));
    displayToast('Course cloned!', ToastType.success);
  };

  const handleLeaveCourseClick = () => {
    dispatch(unsetEnrollment(course!.courseId));
    displayToast(`You have left ${course!.name}`, ToastType.success);
  };

  const handleTakeCourseClick = () => {
    dispatch(
      setEnrollment({
        courseId: course!.courseId,
        enrollmentDate: currentSystemDate(),
      }),
    );
    displayToast(`You are now taking ${course!.name}!`, ToastType.success);
  };

  const renderCloneCourseButton = () => {
    return <S.CloneCourseButton color={ButtonColor.gray} onClick={handleCloneCourseClick} text="Clone Course" />;
  };

  const renderEnrollmentButton = () => {
    if (!isSelfEnrolled) return <S.EnrollmentButton onClick={handleTakeCourseClick} text="Take Course" />;
    return <S.EnrollmentButton onClick={handleLeaveCourseClick} text="Leave Course" />;
  };

  if (!course) {
    dispatch(setActivePage(Page.learnBrowse));
    displayErrorToast('The course you were viewing is no longer available');
    return null;
  }

  return (
    <S.Container className={className}>
      <S.Left>
        <S.CourseName>{course.name}</S.CourseName>
        <S.Instructor accountNumber={course.instructor} />
        <S.CourseDescription>{course.description}</S.CourseDescription>
        <S.Playlist courseId={course.courseId} />
      </S.Left>
      <S.Right>
        <S.Thumbnail thumbnailUrl={course.thumbnailUrl} />
        {renderEnrollmentButton()}
        {renderCloneCourseButton()}
      </S.Right>
    </S.Container>
  );
};

export default LearnCourseHome;
