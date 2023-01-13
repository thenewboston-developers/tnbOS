import {UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/University/store/manager';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[UNIVERSITY_MANAGER] || managerInitialState;
  dispatch(setManager(manager));
};

export default loadAppData;
