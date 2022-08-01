import {configureStore} from '@reduxjs/toolkit';

import selfReducer from 'system/store/self';

const store = configureStore({
  reducer: {
    self: selfReducer,
  },
});

export default store;
