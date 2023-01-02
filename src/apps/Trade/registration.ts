import AppIcon from 'apps/Trade/assets/app-icon.png';
import Trade from 'apps/Trade/containers';
import {AppIconType, AppRegistration} from 'system/types';

const TradeRegistration: AppRegistration = {
  appId: 'trade',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
};

export {Trade, TradeRegistration};
