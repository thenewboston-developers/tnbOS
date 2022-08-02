import {combineReducers, configureStore} from '@reduxjs/toolkit';

import selfReducer from 'system/store/self';

const systemReducer = combineReducers({
  self: selfReducer,
});

const store = configureStore({
  reducer: {
    system: systemReducer,
  },
});

export default store;
