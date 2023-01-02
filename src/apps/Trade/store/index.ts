import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/Trade/store/manager';

const tradeReducer = combineReducers({
  manager: managerReducer,
});

export default tradeReducer;
