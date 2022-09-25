import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {Chat, ChatElectronStore, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {SuppCoins, SuppCoinsRegistration} from 'apps/SuppCoins/registration';
import {getManager} from 'system/selectors/state';
import {AppDataHandlers, AppRegistration, SFC} from 'system/types';

export type AppsElectronStore = ChatElectronStore;

export const appReducers = {
  chat: ChatRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [
  AccountManagerRegistration,
  ChatRegistration,
  NetworkManagerRegistration,
  SuppCoinsRegistration,
];

export const appRouters: AppDataHandlers = {
  chat: ChatRegistration.router!,
};

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
