import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_ENROLLMENTS} from 'apps/University/store/constants';
import {Enrollment, Enrollments} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Enrollments = {};

const enrollments = createSlice({
  initialState,
  name: UNIVERSITY_ENROLLMENTS,
  reducers: {
    setEnrollment: (state: Enrollments, {payload: enrollment}: PayloadAction<Enrollment>) => {
      const {courseId} = enrollment;
      state[courseId] = enrollment;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_ENROLLMENTS, state: current(state)});
    },
    setEnrollments: setLocalAndStateReducer<Enrollments>(UNIVERSITY_ENROLLMENTS),
    unsetEnrollment: (state: Enrollments, {payload: courseId}: PayloadAction<string>) => {
      delete state[courseId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_ENROLLMENTS, state: current(state)});
    },
    unsetEnrollmentsFromCourseIds: (state: Enrollments, {payload: courseIds}: PayloadAction<string[]>) => {
      for (const courseId of courseIds) {
        if (state[courseId]) delete state[courseId];
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_ENROLLMENTS, state: current(state)});
    },
  },
});

export const {setEnrollment, setEnrollments, unsetEnrollment, unsetEnrollmentsFromCourseIds} = enrollments.actions;
export default enrollments.reducer;
