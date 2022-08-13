import {mdiSignal} from '@mdi/js';

import NetworkManager from 'apps/NetworkManager/containers';
import {AppIconType, SystemAppRegistration} from 'system/types';

const NetworkManagerRegistration: SystemAppRegistration = {
  appId: 'NetworkManager',
  icon: mdiSignal,
  iconType: AppIconType.path,
};

export {NetworkManager, NetworkManagerRegistration};
