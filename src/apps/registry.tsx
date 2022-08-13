import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {Chat, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {SuppCoins, SuppCoinsRegistration} from 'apps/SuppCoins/registration';
import {getManager} from 'system/selectors/state';
import {AppRegistration, SFC} from 'system/types';

export const appRegistrations: AppRegistration[] = [
  AccountManagerRegistration,
  ChatRegistration,
  NetworkManagerRegistration,
  SuppCoinsRegistration,
];

export const Apps: SFC = () => {
  const {activeApp} = useSelector(getManager);

  return (
    <>
      <Chat display={activeApp === ChatRegistration.appId} />
      <SuppCoins display={activeApp === SuppCoinsRegistration.appId} />
      <AccountManager display={activeApp === AccountManagerRegistration.appId} />
      <NetworkManager display={activeApp === NetworkManagerRegistration.appId} />
    </>
  );
};
