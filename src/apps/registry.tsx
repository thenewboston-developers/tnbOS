import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {Chat, ChatElectronStore, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {University, UniversityRegistration} from 'apps/University/registration';
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
  UniversityRegistration,
];

export const appRouters: AppDataHandlers = {
  chat: ChatRegistration.router!,
};

export const Apps: SFC = () => {
  const {activeApp} = useSelector(getManager);

  return (
    <>
      <Chat display={activeApp === ChatRegistration.appId} />
      <University display={activeApp === UniversityRegistration.appId} />
      <AccountManager display={activeApp === AccountManagerRegistration.appId} />
      <NetworkManager display={activeApp === NetworkManagerRegistration.appId} />
    </>
  );
};
