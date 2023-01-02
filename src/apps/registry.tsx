import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {Art, ArtElectronStore, ArtRegistration} from 'apps/Art/registration';
import {Chat, ChatElectronStore, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {SpeedTest, SpeedTestElectronStore, SpeedTestRegistration} from 'apps/SpeedTest/registration';
import {University, UniversityRegistration} from 'apps/University/registration';
import {getManager} from 'system/selectors/state';
import {AppDataHandlers, AppRegistration, SFC} from 'system/types';

export interface AppsElectronStore extends ArtElectronStore, ChatElectronStore, SpeedTestElectronStore {}

export const appReducers = {
  art: ArtRegistration.reducer!,
  chat: ChatRegistration.reducer!,
  speedTest: SpeedTestRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [
  ChatRegistration,
  SpeedTestRegistration,
  ArtRegistration,
  UniversityRegistration,
  AccountManagerRegistration,
  NetworkManagerRegistration,
];

export const appRouters: AppDataHandlers = {
  art: ArtRegistration.router!,
  chat: ChatRegistration.router!,
  speedTest: SpeedTestRegistration.router!,
};

export const Apps: SFC = () => {
  const {activeApp} = useSelector(getManager);

  return (
    <>
      <AccountManager display={activeApp === AccountManagerRegistration.appId} />
      <Art display={activeApp === ArtRegistration.appId} />
      <Chat display={activeApp === ChatRegistration.appId} />
      <SpeedTest display={activeApp === SpeedTestRegistration.appId} />
      <NetworkManager display={activeApp === NetworkManagerRegistration.appId} />
      <University display={activeApp === UniversityRegistration.appId} />
    </>
  );
};
