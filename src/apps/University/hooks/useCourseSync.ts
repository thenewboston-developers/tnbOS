import {useMemo} from 'react';

import {setCoursesBlock} from 'apps/University/blocks';
import useConnectedAccounts, {ConnectedAccount} from 'apps/University/hooks/useConnectedAccounts';
import useTaughtCourses from 'apps/University/hooks/useTaughtCourses';
import {PublicationStatus} from 'apps/University/types/publicationStatus';

let accountsSynced: ConnectedAccount[] = [];

const useCourseSync = () => {
  const connectedAccounts = useConnectedAccounts();
  const taughtCourses = useTaughtCourses();

  const accountsSyncedAccountNumbers = accountsSynced.map(({accountNumber}) => accountNumber);

  const connectedAccountsToSync = connectedAccounts.filter(
    ({accountNumber}) => !accountsSyncedAccountNumbers.includes(accountNumber),
  );

  const taughtPublishedCourses = useMemo(() => {
    return taughtCourses.filter(({publicationStatus}) => publicationStatus === PublicationStatus.published);
  }, [taughtCourses]);

  (async () => {
    accountsSynced = [...accountsSynced, ...connectedAccountsToSync];

    for (const connectedAccount of connectedAccountsToSync) {
      try {
        await setCoursesBlock({
          networkId: connectedAccount.defaultNetworkId,
          params: taughtPublishedCourses,
          recipient: connectedAccount.accountNumber,
        });
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

export default useCourseSync;
