import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/Shop/store/manager';

const shopReducer = combineReducers({
  manager: managerReducer,
});

export default shopReducer;
