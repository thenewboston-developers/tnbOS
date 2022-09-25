import AppIcon from 'apps/University/assets/app-icon.png';
import University from 'apps/University/containers';
import {AppIconType, AppRegistration} from 'system/types';

const UniversityRegistration: AppRegistration = {
  appId: 'university',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
};

export {University, UniversityRegistration};
