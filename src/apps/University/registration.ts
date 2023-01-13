import AppIcon from 'apps/University/assets/app-icon.png';
import University from 'apps/University/containers';
import universityReducer from 'apps/University/store';
import loadAppData from 'apps/University/store/initializer';
import {UniversityElectronStore} from 'apps/University/types';
import {AppIconType, AppRegistration} from 'system/types';

const UniversityRegistration: AppRegistration = {
  appId: 'university',
  icon: AppIcon,
  iconType: AppIconType.image,
  initializer: loadAppData,
  isSystemApp: false,
  reducer: universityReducer,
};

export {University, UniversityElectronStore, UniversityRegistration};
