import AppIcon from 'apps/Trade/assets/app-icon.png';
import Trade from 'apps/Trade/containers';
import tradeReducer from 'apps/Trade/store';
import loadAppData from 'apps/Trade/store/initializer';
import {TradeElectronStore} from 'apps/Trade/types';
import {AppIconType, AppRegistration} from 'system/types';

const TradeRegistration: AppRegistration = {
  appId: 'trade',
  icon: AppIcon,
  iconType: AppIconType.image,
  initializer: loadAppData,
  isSystemApp: false,
  reducer: tradeReducer,
};

export {Trade, TradeElectronStore, TradeRegistration};
