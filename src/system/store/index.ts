import {combineReducers, configureStore} from '@reduxjs/toolkit';

import internalReducer from 'system/store/internal';
import managerReducer from 'system/store/manager';
import networksReducer from 'system/store/networks';
import selfReducer from 'system/store/self';

const systemReducer = combineReducers({
  internal: internalReducer,
  manager: managerReducer,
  networks: networksReducer,
  self: selfReducer,
});

const store = configureStore({
  reducer: {
    system: systemReducer,
  },
});

export default store;
