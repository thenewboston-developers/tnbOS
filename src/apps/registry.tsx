import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {ArtElectronStore} from 'apps/Art/registration';
import {Chat, ChatElectronStore, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {SpeedTestElectronStore} from 'apps/SpeedTest/registration';
import {TradeElectronStore} from 'apps/Trade/registration';
import {University, UniversityElectronStore, UniversityRegistration} from 'apps/University/registration';
import {getManager} from 'system/selectors/state';
import {AppDataHandlers, AppRegistration, SFC} from 'system/types';

export interface AppsElectronStore
  extends ArtElectronStore,
    ChatElectronStore,
    SpeedTestElectronStore,
    TradeElectronStore,
    UniversityElectronStore {}

export const appReducers = {
  // art: ArtRegistration.reducer!,
  chat: ChatRegistration.reducer!,
  // speedTest: SpeedTestRegistration.reducer!,
  // trade: TradeRegistration.reducer!,
  university: UniversityRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [
  ChatRegistration,
  // TradeRegistration,
  // ArtRegistration,
  // SpeedTestRegistration,
  UniversityRegistration,
  AccountManagerRegistration,
  NetworkManagerRegistration,
];

export const appRouters: AppDataHandlers = {
  // art: ArtRegistration.router!,
  chat: ChatRegistration.router!,
  // speedTest: SpeedTestRegistration.router!,
  // trade: TradeRegistration.router!,
  university: UniversityRegistration.router!,
};

export const Apps: SFC = () => {
  const {activeApp} = useSelector(getManager);

  return (
    <>
      <AccountManager display={activeApp === AccountManagerRegistration.appId} />
      {/*<Art display={activeApp === ArtRegistration.appId} />*/}
      <Chat display={activeApp === ChatRegistration.appId} />
      <NetworkManager display={activeApp === NetworkManagerRegistration.appId} />
      {/*<SpeedTest display={activeApp === SpeedTestRegistration.appId} />*/}
      {/*<Trade display={activeApp === TradeRegistration.appId} />*/}
      <University display={activeApp === UniversityRegistration.appId} />
    </>
  );
};
