import {TRADE_MANAGER, TRADE_OFFERS, TRADE_OFFERS_SYNC} from 'apps/Trade/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Trade/store/manager';
import {initialState as offersInitialState, setOffers} from 'apps/Trade/store/offers';
import {initialState as offersSyncInitialState, setOffersSync} from 'apps/Trade/store/offersSync';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[TRADE_MANAGER] || managerInitialState;
  const offers = store?.[TRADE_OFFERS] || offersInitialState;
  const offersSync = store?.[TRADE_OFFERS_SYNC] || offersSyncInitialState;
  dispatch(setManager(manager));
  dispatch(setOffers(offers));
  dispatch(setOffersSync(offersSync));
};

export default loadAppData;
