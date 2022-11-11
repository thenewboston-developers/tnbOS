import AppIcon from 'apps/SpeedTest/assets/app-icon.png';
import SpeedTest from 'apps/SpeedTest/containers';
import {AppIconType, AppRegistration} from 'system/types';

const SpeedTestRegistration: AppRegistration = {
  appId: 'speedTest',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
};

export {SpeedTest, SpeedTestRegistration};
