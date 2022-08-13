import AppIcon from 'apps/Chat/assets/app-icon.png';
import Chat from 'apps/Chat/containers';
import {AppIconType, AppRegistration} from 'system/types';

const ChatRegistration: AppRegistration = {
  appId: 'Chat',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
};

export {Chat, ChatRegistration};
