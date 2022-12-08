import AppIcon from 'apps/Art/assets/app-icon.png';
import Art from 'apps/Art/containers';
import artReducer from 'apps/Art/store';
import {AppIconType, AppRegistration} from 'system/types';

const ArtRegistration: AppRegistration = {
  appId: 'art',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
  reducer: artReducer,
};

export {Art, ArtRegistration};
