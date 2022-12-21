import AppIcon from 'apps/Art/assets/app-icon.png';
import Art from 'apps/Art/containers';
import appRouter from 'apps/Art/routers/appRouter';
import artReducer from 'apps/Art/store';
import loadArtStoreData from 'apps/Art/store/initializer';
import {ArtElectronStore} from 'apps/Art/types';
import {AppIconType, AppRegistration} from 'system/types';

const ArtRegistration: AppRegistration = {
  appId: 'art',
  icon: AppIcon,
  iconType: AppIconType.image,
  initializer: loadArtStoreData,
  isSystemApp: false,
  reducer: artReducer,
  router: appRouter,
};

export {Art, ArtElectronStore, ArtRegistration};
