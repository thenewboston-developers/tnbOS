import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getLectureRecordBlock} from 'apps/University/blocks';
import {useActiveLearnCourse, useIsSelfEnrolled} from 'apps/University/hooks';
import {setEnrollment, unsetEnrollment} from 'apps/University/store/enrollments';
import {getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';
import {displayErrorToast, displayToast} from 'system/utils/toast';
import * as S from './Styles';

const LearnCourseHome: SFC = ({className}) => {
  const [lectureRecordRequested, setLectureRecordRequested] = useState<boolean>(false);
  const balances = useSelector(getBalances);
  const course = useActiveLearnCourse();
  const dispatch = useDispatch<AppDispatch>();
  const isSelfEnrolled = useIsSelfEnrolled(course?.courseId);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  useEffect(() => {
    if (!course || lectureRecordRequested) return;

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

        setLectureRecordRequested(true);
      } catch (error) {
        displayErrorToast('Error sending the course record');
      }
    })();
  }, [balances, course, lectureRecordRequested, networkAccountOnlineStatuses]);

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

  const renderButton = () => {
    if (!isSelfEnrolled) return <S.Button onClick={handleTakeCourseClick} text="Take Course" />;
    return <S.Button onClick={handleLeaveCourseClick} text="Leave Course" />;
  };

  if (!course) return null;

  return (
    <S.Container className={className}>
      <S.Left>
        <S.CourseName>{course.name}</S.CourseName>
        <S.Instructor accountNumber={course.instructor} />
        <S.CourseDescription>{course.description}</S.CourseDescription>
        <S.Playlist courseId={course.courseId} />
      </S.Left>
      <S.Right>
        <S.Thumbnail alt="thumbnail" src={course.thumbnailUrl} />
        {renderButton()}
      </S.Right>
    </S.Container>
  );
};

export default LearnCourseHome;
