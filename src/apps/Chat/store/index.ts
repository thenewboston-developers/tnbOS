import {combineReducers, Reducer} from '@reduxjs/toolkit';

import managerReducer from 'apps/Chat/store/manager';

const chatReducer: Reducer = combineReducers({
  manager: managerReducer,
});

export default chatReducer;
