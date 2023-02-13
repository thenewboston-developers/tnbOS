import {useSelector} from 'react-redux';

import {AccountManager, AccountManagerRegistration} from 'apps/AccountManager/registration';
import {Chat, ChatElectronStore, ChatRegistration} from 'apps/Chat/registration';
import {NetworkManager, NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {Shop, ShopElectronStore, ShopRegistration} from 'apps/Shop/registration';
import {SpeedTest, SpeedTestElectronStore, SpeedTestRegistration} from 'apps/SpeedTest/registration';
import {Trade, TradeElectronStore, TradeRegistration} from 'apps/Trade/registration';
import {University, UniversityElectronStore, UniversityRegistration} from 'apps/University/registration';
import {getManager} from 'system/selectors/state';
import {AppDataHandlers, AppRegistration, SFC} from 'system/types';

export interface AppsElectronStore
  extends ChatElectronStore,
    ShopElectronStore,
    SpeedTestElectronStore,
    TradeElectronStore,
    UniversityElectronStore {}

export const appReducers = {
  chat: ChatRegistration.reducer!,
  shop: ShopRegistration.reducer!,
  speedTest: SpeedTestRegistration.reducer!,
  trade: TradeRegistration.reducer!,
  university: UniversityRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [
  UniversityRegistration,
  ChatRegistration,
  TradeRegistration,
  SpeedTestRegistration,
  ShopRegistration,
  AccountManagerRegistration,
  NetworkManagerRegistration,
];

export const appRouters: AppDataHandlers = {
  chat: ChatRegistration.router!,
  shop: ShopRegistration.router!,
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
      <Shop display={activeApp === ShopRegistration.appId} />
      <SpeedTest display={activeApp === SpeedTestRegistration.appId} />
      <Trade display={activeApp === TradeRegistration.appId} />
      <University display={activeApp === UniversityRegistration.appId} />
    </>
  );
};
