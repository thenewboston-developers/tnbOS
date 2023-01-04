import {TRADE_MANAGER, TRADE_OFFERS} from 'apps/Trade/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Trade/store/manager';
import {initialState as offersInitialState, setOffers} from 'apps/Trade/store/offers';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[TRADE_MANAGER] || managerInitialState;
  const offers = store?.[TRADE_OFFERS] || offersInitialState;
  dispatch(setManager(manager));
  dispatch(setOffers(offers));
};

export default loadAppData;
