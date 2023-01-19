import {setCoursesBlock} from 'apps/University/blocks';
import useConnectedAccounts, {ConnectedAccount} from 'apps/University/hooks/useConnectedAccounts';
import useTaughtCourses from 'apps/University/hooks/useTaughtCourses';

let accountsSynced: ConnectedAccount[] = [];

const useCourseSync = () => {
  const connectedAccounts = useConnectedAccounts();
  const taughtCourses = useTaughtCourses();

  const accountsSyncedAccountNumbers = accountsSynced.map(({accountNumber}) => accountNumber);
  const connectedAccountsToSync = connectedAccounts.filter(
    ({accountNumber}) => !accountsSyncedAccountNumbers.includes(accountNumber),
  );

  (async () => {
    for (const connectedAccount of connectedAccountsToSync) {
      try {
        console.log('Syncing...');
        console.log(connectedAccount.accountNumber);
        console.log(connectedAccount.defaultNetworkId);

        await setCoursesBlock({
          networkId: connectedAccount.defaultNetworkId,
          params: taughtCourses,
          recipient: connectedAccount.accountNumber,
        });

        accountsSynced = [...accountsSynced, connectedAccount];
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

export default useCourseSync;
