import AppIcon from 'apps/Chat/assets/app-icon.png';
import Chat from 'apps/Chat/containers';
import appRouter from 'apps/Chat/routers/appRouter';
import chatReducer from 'apps/Chat/store';
import loadAppData from 'apps/Chat/store/initializer';
import {ChatElectronStore} from 'apps/Chat/types';
import {AppIconType, AppRegistration} from 'system/types';

const ChatRegistration: AppRegistration = {
  appId: 'chat',
  icon: AppIcon,
  iconType: AppIconType.image,
  initializer: loadAppData,
  isSystemApp: false,
  reducer: chatReducer,
  router: appRouter,
};

export {Chat, ChatElectronStore, ChatRegistration};
