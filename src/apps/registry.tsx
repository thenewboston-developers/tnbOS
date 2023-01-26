import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {Chat, ChatElectronStore, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {SpeedTest, SpeedTestElectronStore, SpeedTestRegistration} from 'apps/SpeedTest/registration';
import {Trade, TradeElectronStore, TradeRegistration} from 'apps/Trade/registration';
import {University, UniversityElectronStore, UniversityRegistration} from 'apps/University/registration';
import {getManager} from 'system/selectors/state';
import {AppDataHandlers, AppRegistration, SFC} from 'system/types';

export interface AppsElectronStore
  extends ChatElectronStore,
    SpeedTestElectronStore,
    TradeElectronStore,
    UniversityElectronStore {}

export const appReducers = {
  chat: ChatRegistration.reducer!,
  speedTest: SpeedTestRegistration.reducer!,
  trade: TradeRegistration.reducer!,
  university: UniversityRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [
  UniversityRegistration,
  ChatRegistration,
  TradeRegistration,
  SpeedTestRegistration,
  AccountManagerRegistration,
  NetworkManagerRegistration,
];

export const appRouters: AppDataHandlers = {
  chat: ChatRegistration.router!,
  speedTest: SpeedTestRegistration.router!,
  trade: TradeRegistration.router!,
  university: UniversityRegistration.router!,
};

export const Apps: SFC = () => {
  const {activeApp} = useSelector(getManager);

  return (
    <>
      <AccountManager display={activeApp === AccountManagerRegistration.appId} />
      <Chat display={activeApp === ChatRegistration.appId} />
      <NetworkManager display={activeApp === NetworkManagerRegistration.appId} />
      <SpeedTest display={activeApp === SpeedTestRegistration.appId} />
      <Trade display={activeApp === TradeRegistration.appId} />
      <University display={activeApp === UniversityRegistration.appId} />
    </>
  );
};
