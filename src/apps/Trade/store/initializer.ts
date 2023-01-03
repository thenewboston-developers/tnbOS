import {TRADE_MANAGER} from 'apps/Trade/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Trade/store/manager';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[TRADE_MANAGER] || managerInitialState;
  dispatch(setManager(manager));
};

export default loadAppData;
