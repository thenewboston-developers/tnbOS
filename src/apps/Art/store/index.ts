import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/Art/store/manager';

const artReducer = combineReducers({
  manager: managerReducer,
});

export default artReducer;
