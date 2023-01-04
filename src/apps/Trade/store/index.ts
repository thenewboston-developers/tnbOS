import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/Trade/store/manager';
import offersReducer from 'apps/Trade/store/offers';

const tradeReducer = combineReducers({
  manager: managerReducer,
  offers: offersReducer,
});

export default tradeReducer;
