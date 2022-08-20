import {mdiSignal} from '@mdi/js';

import NetworkManager from 'apps/NetworkManager/containers';
import {AppIconType, SystemAppRegistration} from 'system/types';

const NetworkManagerRegistration: SystemAppRegistration = {
  appId: 'networkManager',
  icon: mdiSignal,
  iconType: AppIconType.path,
  isSystemApp: true,
};

export {NetworkManager, NetworkManagerRegistration};
