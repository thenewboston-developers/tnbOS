import {combineReducers} from '@reduxjs/toolkit';

import courseRecordRecipientsReducer from 'apps/University/store/courseRecordRecipients';
import courseRecordsReducer from 'apps/University/store/courseRecords';
import coursesReducer from 'apps/University/store/courses';
import enrollmentsReducer from 'apps/University/store/enrollments';
import lectureRecordsReducer from 'apps/University/store/lectureRecords';
import lecturesReducer from 'apps/University/store/lectures';
import managerReducer from 'apps/University/store/manager';

const universityReducer = combineReducers({
  courseRecordRecipients: courseRecordRecipientsReducer,
  courseRecords: courseRecordsReducer,
  courses: coursesReducer,
  enrollments: enrollmentsReducer,
  lectureRecords: lectureRecordsReducer,
  lectures: lecturesReducer,
  manager: managerReducer,
});

export default universityReducer;
