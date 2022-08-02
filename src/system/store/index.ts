import {combineReducers, configureStore} from '@reduxjs/toolkit';

import internalReducer from 'system/store/internal';
import selfReducer from 'system/store/self';

const systemReducer = combineReducers({
  internal: internalReducer,
  self: selfReducer,
});

const store = configureStore({
  reducer: {
    system: systemReducer,
  },
});

export default store;
