import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/Trade/store/manager';
import offersReducer from 'apps/Trade/store/offers';
import offersSyncReducer from 'apps/Trade/store/offersSync';
import remoteOffersReducer from 'apps/Trade/store/remoteOffers';

const tradeReducer = combineReducers({
  manager: managerReducer,
  offers: offersReducer,
  offersSync: offersSyncReducer,
  remoteOffers: remoteOffersReducer,
});

export default tradeReducer;
