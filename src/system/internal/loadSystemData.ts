import {LocalElectronStore} from 'shared/types';
import {initialState as accountsInitialState, setAccounts} from 'system/store/accounts';
import {initializeBalances, initialState as balancesInitialState, setBalances} from 'system/store/balances';
import {
  SYSTEM_ACCOUNTS,
  SYSTEM_BALANCES,
  SYSTEM_MANAGER,
  SYSTEM_NETWORKS,
  SYSTEM_SELF,
  SYSTEM_SOCKET_STATUSES,
} from 'system/store/constants';
import {initialState as managerInitialState, setManager} from 'system/store/manager';
import {initialState as networksInitialState, setNetworks} from 'system/store/networks';
import {initialState as selfInitialState, setSelf} from 'system/store/self';
import {
  initializeSocketStatuses,
  initialState as socketStatusesInitialState,
  setSocketStatuses,
} from 'system/store/socketStatuses';
import {AppDispatch, Self} from 'system/types';

const loadSystemData = (dispatch: AppDispatch, store: LocalElectronStore): Self => {
  // System data
  const storeAccounts = store?.[SYSTEM_ACCOUNTS] || accountsInitialState;
  const storeBalances = store?.[SYSTEM_BALANCES] || balancesInitialState;
  const storeManager = store?.[SYSTEM_MANAGER] || managerInitialState;
  const storeNetworks = store?.[SYSTEM_NETWORKS] || networksInitialState;
  const storeSelf = store?.[SYSTEM_SELF] || selfInitialState;
  const storeSocketStatuses = store?.[SYSTEM_SOCKET_STATUSES] || socketStatusesInitialState;
  dispatch(setAccounts(storeAccounts));
  dispatch(setBalances(storeBalances));
  dispatch(setManager(storeManager));
  dispatch(setNetworks(storeNetworks));
  dispatch(setSelf(storeSelf));
  dispatch(setSocketStatuses(storeSocketStatuses));

  // System initialization
  dispatch(initializeBalances());
  dispatch(initializeSocketStatuses());

  return storeSelf;
};

export default loadSystemData;
