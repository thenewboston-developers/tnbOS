import useConnectedAccounts, {ConnectedAccount} from 'apps/University/hooks/useConnectedAccounts';

let accountsSynced: ConnectedAccount[] = [];

const useCourseSync = () => {
  const connectedAccounts = useConnectedAccounts();

  const accountsSyncedAccountNumbers = accountsSynced.map(({accountNumber}) => accountNumber);
  const connectedAccountsToSync = connectedAccounts.filter(
    ({accountNumber}) => !accountsSyncedAccountNumbers.includes(accountNumber),
  );

  for (const connectedAccount of connectedAccountsToSync) {
    console.log('Syncing...');
    console.log(connectedAccount.accountNumber);
    console.log(connectedAccount.defaultNetworkId);
    accountsSynced = [...accountsSynced, connectedAccount];
  }
};

export default useCourseSync;
