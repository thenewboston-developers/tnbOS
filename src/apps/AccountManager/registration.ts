import AppIcon from 'apps/AccountManager/assets/app-icon.png';
import AccountManager from 'apps/AccountManager/containers';
import {AppRegistration} from 'system/types';

const AccountManagerRegistration: AppRegistration = {
  appId: 'AccountManager',
  icon: AppIcon,
};

export {AccountManager, AccountManagerRegistration};
