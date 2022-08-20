import AppIcon from 'apps/Chat/assets/app-icon.png';
import Chat from 'apps/Chat/containers';
import chatReducer from 'apps/Chat/store';
import loadChatStoreData from 'apps/Chat/store/initializer';
import {ChatElectronStore} from 'apps/Chat/types';
import {AppIconType, AppRegistration} from 'system/types';

const ChatRegistration: AppRegistration = {
  appId: 'chat',
  icon: AppIcon,
  iconType: AppIconType.image,
  initializer: loadChatStoreData,
  isSystemApp: false,
  reducer: chatReducer,
};

export {Chat, ChatElectronStore, ChatRegistration};
