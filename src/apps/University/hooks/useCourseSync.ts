import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {setCourseWithLecturesBlock} from 'apps/University/blocks';
import useConnectedAccounts, {ConnectedAccount} from 'apps/University/hooks/useConnectedAccounts';
import useTaughtCourses from 'apps/University/hooks/useTaughtCourses';
import {getLectures} from 'apps/University/selectors/state';
import {PublicationStatus} from 'apps/University/types';

let accountsSynced: ConnectedAccount[] = [];

const useCourseSync = () => {
  const connectedAccounts = useConnectedAccounts();
  const lectures = useSelector(getLectures);
  const taughtCourses = useTaughtCourses();

  const accountsSyncedAccountNumbers = accountsSynced.map(({accountNumber}) => accountNumber);

  const connectedAccountsToSync = connectedAccounts.filter(
    ({accountNumber}) => !accountsSyncedAccountNumbers.includes(accountNumber),
  );

  const publishedCourseLectures = useCallback(
    (courseId: string) => {
      return Object.values(lectures)
        .filter((lecture) => courseId === lecture.courseId)
        .filter(({publicationStatus}) => publicationStatus === PublicationStatus.published);
    },
    [lectures],
  );

  const taughtPublishedCourses = useMemo(() => {
    return taughtCourses.filter(({publicationStatus}) => publicationStatus === PublicationStatus.published);
  }, [taughtCourses]);

  const sendCoursesAndLectures = async (connectedAccount: ConnectedAccount) => {
    for (const course of taughtPublishedCourses) {
      try {
        await setCourseWithLecturesBlock({
          networkId: connectedAccount.defaultNetworkId,
          params: {
            course: course,
            lectures: publishedCourseLectures(course.courseId),
          },
          recipient: connectedAccount.accountNumber,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  (async () => {
    accountsSynced = [...accountsSynced, ...connectedAccountsToSync];
    for (const connectedAccount of connectedAccountsToSync) await sendCoursesAndLectures(connectedAccount);
  })();
};

export default useCourseSync;
