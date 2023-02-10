import {SHOP_MANAGER} from 'apps/Shop/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Shop/store/manager';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[SHOP_MANAGER] || managerInitialState;
  dispatch(setManager(manager));
};

export default loadAppData;
