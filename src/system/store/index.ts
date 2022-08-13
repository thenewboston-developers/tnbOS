import {combineReducers, configureStore} from '@reduxjs/toolkit';

import accountsReducer from 'system/store/accounts';
import balancesReducer from 'system/store/balances';
import internalReducer from 'system/store/internal';
import managerReducer from 'system/store/manager';
import networksReducer from 'system/store/networks';
import selfReducer from 'system/store/self';
import socketStatusesReducer from 'system/store/socketStatuses';

const systemReducer = combineReducers({
  accounts: accountsReducer,
  balances: balancesReducer,
  internal: internalReducer,
  manager: managerReducer,
  networks: networksReducer,
  self: selfReducer,
  socketStatuses: socketStatusesReducer,
});

const store = configureStore({
  reducer: {
    system: systemReducer,
  },
});

export default store;
