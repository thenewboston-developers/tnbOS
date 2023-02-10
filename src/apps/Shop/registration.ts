import AppIcon from 'apps/Shop/assets/app-icon.png';
import Shop from 'apps/Shop/containers';
import {AppIconType, AppRegistration} from 'system/types';

const ShopRegistration: AppRegistration = {
  appId: 'shop',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
};

export {Shop, ShopRegistration};
