import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {Chat, ChatElectronStore, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {SuppCoins, SuppCoinsRegistration} from 'apps/SuppCoins/registration';
import {getManager} from 'system/selectors/state';
import {AppReducers, AppRegistration, AppRouters, SFC} from 'system/types';

export type AppsElectronStore = ChatElectronStore;

export const appReducers: AppReducers = {
  chat: ChatRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [
  AccountManagerRegistration,
  ChatRegistration,
  NetworkManagerRegistration,
  SuppCoinsRegistration,
];

export const appRouters: AppRouters = {
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
