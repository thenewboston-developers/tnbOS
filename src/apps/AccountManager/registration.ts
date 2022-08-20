import {mdiCellphoneLink} from '@mdi/js';

import AccountManager from 'apps/AccountManager/containers';
import {AppIconType, SystemAppRegistration} from 'system/types';

const AccountManagerRegistration: SystemAppRegistration = {
  appId: 'accountManager',
  icon: mdiCellphoneLink,
  iconType: AppIconType.path,
  isSystemApp: true,
};

export {AccountManager, AccountManagerRegistration};
