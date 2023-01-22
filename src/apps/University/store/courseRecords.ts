import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_COURSE_RECORDS} from 'apps/University/store/constants';
import {Course, CourseRecords} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {currentSystemDate} from 'system/utils/dates';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: CourseRecords = {};

const courseRecords = createSlice({
  initialState,
  name: UNIVERSITY_COURSE_RECORDS,
  reducers: {
    setCourseRecord: (state: CourseRecords, {payload: course}: PayloadAction<Course>) => {
      const {courseId, instructor, modifiedDate} = course;

      if (!state[instructor]) {
        state[instructor] = {
          courseModifiedDates: {
            [courseId]: modifiedDate,
          },
          recordModifiedDate: modifiedDate,
        };
      } else {
        state[instructor].courseModifiedDates[courseId] = modifiedDate;
        state[instructor].recordModifiedDate = modifiedDate;
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_COURSE_RECORDS, state: current(state)});
    },
    setCourseRecords: setLocalAndStateReducer<CourseRecords>(UNIVERSITY_COURSE_RECORDS),
    unsetCourseRecord: (state: CourseRecords, {payload}: PayloadAction<{courseId: string; instructor: string}>) => {
      const {courseId, instructor} = payload;
      delete state[instructor].courseModifiedDates[courseId];
      state[instructor].recordModifiedDate = currentSystemDate();
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_COURSE_RECORDS, state: current(state)});
    },
  },
});

export const {setCourseRecord, setCourseRecords, unsetCourseRecord} = courseRecords.actions;
export default courseRecords.reducer;
