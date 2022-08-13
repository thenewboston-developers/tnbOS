import AppIcon from 'apps/Chat/assets/app-icon.png';
import Chat from 'apps/Chat/containers';
import {AppRegistration} from 'system/types';

const ChatRegistration: AppRegistration = {
  appId: 'Chat',
  icon: AppIcon,
};

export {Chat, ChatRegistration};
