import {mdiCellphoneLink} from '@mdi/js';

import AccountManager from 'apps/AccountManager/containers';
import {AppIconType, SystemAppRegistration} from 'system/types';

const AccountManagerRegistration: SystemAppRegistration = {
  appId: 'AccountManager',
  icon: mdiCellphoneLink,
  iconType: AppIconType.path,
};

export {AccountManager, AccountManagerRegistration};
