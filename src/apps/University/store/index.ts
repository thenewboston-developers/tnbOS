import {combineReducers} from '@reduxjs/toolkit';

import coursesReducer from 'apps/University/store/courses';
import enrollmentsReducer from 'apps/University/store/enrollments';
import lecturesReducer from 'apps/University/store/lectures';
import managerReducer from 'apps/University/store/manager';

const universityReducer = combineReducers({
  courses: coursesReducer,
  enrollments: enrollmentsReducer,
  lectures: lecturesReducer,
  manager: managerReducer,
});

export default universityReducer;
