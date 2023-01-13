import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/University/store/manager';

const universityReducer = combineReducers({
  manager: managerReducer,
});

export default universityReducer;
