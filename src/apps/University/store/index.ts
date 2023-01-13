import {combineReducers} from '@reduxjs/toolkit';

import coursesReducer from 'apps/University/store/courses';
import managerReducer from 'apps/University/store/manager';

const universityReducer = combineReducers({
  courses: coursesReducer,
  manager: managerReducer,
});

export default universityReducer;
