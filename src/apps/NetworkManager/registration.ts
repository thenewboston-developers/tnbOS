import AppIcon from 'apps/NetworkManager/assets/app-icon.png';
import NetworkManager from 'apps/NetworkManager/containers';
import {AppRegistration} from 'system/types';

const NetworkManagerRegistration: AppRegistration = {
  appId: 'NetworkManager',
  icon: AppIcon,
};

export {NetworkManager, NetworkManagerRegistration};
