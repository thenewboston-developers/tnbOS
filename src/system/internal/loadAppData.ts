import {appRegistrations} from 'apps/registry';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  for (const registration of appRegistrations) {
    if (registration.hasOwnProperty('initializer')) {
      registration.initializer!(dispatch, store);
    }
  }
};

export default loadAppData;
