import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_COURSES} from 'apps/University/store/constants';
import {Course, Courses} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Courses = {};

const courses = createSlice({
  initialState,
  name: UNIVERSITY_COURSES,
  reducers: {
    setCourse: (state: Courses, {payload: course}: PayloadAction<Course>) => {
      const {courseId} = course;
      state[courseId] = course;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_COURSES, state: current(state)});
    },
    setCourses: setLocalAndStateReducer<Courses>(UNIVERSITY_COURSES),
    unsetCourse: (state: Courses, {payload: courseId}: PayloadAction<string>) => {
      delete state[courseId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_COURSES, state: current(state)});
    },
    unsetCourses: (state: Courses, {payload: courseIds}: PayloadAction<string[]>) => {
      for (const courseId of courseIds) {
        if (state[courseId]) delete state[courseId];
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_COURSES, state: current(state)});
    },
  },
});

export const {setCourse, setCourses, unsetCourse, unsetCourses} = courses.actions;
export default courses.reducer;
