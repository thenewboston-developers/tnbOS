import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_COURSE_RECORD_RECIPIENTS} from 'apps/University/store/constants';
import {CourseRecordRecipient, CourseRecordRecipients} from 'apps/University/types';

export const initialState: CourseRecordRecipients = {};

const courseRecordRecipients = createSlice({
  initialState,
  name: UNIVERSITY_COURSE_RECORD_RECIPIENTS,
  reducers: {
    resetCourseRecordRecipients: () => initialState,
    setCourseRecordRecipient: (
      state: CourseRecordRecipients,
      {payload: courseRecordRecipient}: PayloadAction<CourseRecordRecipient>,
    ) => {
      const {accountNumber} = courseRecordRecipient;
      state[accountNumber] = courseRecordRecipient;
    },
    unsetCourseRecordRecipient: (state: CourseRecordRecipients, {payload: accountNumber}: PayloadAction<string>) => {
      delete state[accountNumber];
    },
  },
});

export const {resetCourseRecordRecipients, setCourseRecordRecipient, unsetCourseRecordRecipient} = courseRecordRecipients.actions;
export default courseRecordRecipients.reducer;
