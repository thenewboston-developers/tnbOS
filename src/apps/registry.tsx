import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {getManager} from 'system/selectors/state';
import {AppRegistration, SFC} from 'system/types';

export const appRegistrations: AppRegistration[] = [AccountManagerRegistration, NetworkManagerRegistration];

export const Apps: SFC = () => {
  const manager = useSelector(getManager);

  return (
    <>
      <AccountManager display={manager.activeApp === AccountManagerRegistration.appId} />
      <NetworkManager display={manager.activeApp === NetworkManagerRegistration.appId} />
    </>
  );
};
