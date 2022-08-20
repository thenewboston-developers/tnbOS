import AppIcon from 'apps/SuppCoins/assets/app-icon.png';
import SuppCoins from 'apps/SuppCoins/containers';
import {AppIconType, AppRegistration} from 'system/types';

const SuppCoinsRegistration: AppRegistration = {
  appId: 'suppCoins',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
};

export {SuppCoins, SuppCoinsRegistration};
