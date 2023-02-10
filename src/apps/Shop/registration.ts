import AppIcon from 'apps/Shop/assets/app-icon.png';
import Shop from 'apps/Shop/containers';
import shopReducer from 'apps/Shop/store';
import loadAppData from 'apps/Shop/store/initializer';
import {ShopElectronStore} from 'apps/Shop/types';
import {AppIconType, AppRegistration} from 'system/types';

const ShopRegistration: AppRegistration = {
  appId: 'shop',
  icon: AppIcon,
  iconType: AppIconType.image,
  initializer: loadAppData,
  isSystemApp: false,
  reducer: shopReducer,
};

export {Shop, ShopElectronStore, ShopRegistration};
