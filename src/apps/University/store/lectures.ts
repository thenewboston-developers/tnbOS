import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import orderBy from 'lodash/orderBy';

import {UNIVERSITY_LECTURES} from 'apps/University/store/constants';
import {Lecture, Lectures} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Lectures = {};

const lectures = createSlice({
  initialState,
  name: UNIVERSITY_LECTURES,
  reducers: {
    setLecture: (state: Lectures, {payload: lecture}: PayloadAction<Lecture>) => {
      const {lectureId} = lecture;
      state[lectureId] = lecture;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    setLectureList: (state: Lectures, {payload}: PayloadAction<Lecture[]>) => {
      for (const lecture of payload) {
        const {lectureId} = lecture;
        state[lectureId] = lecture;
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    setLectures: setLocalAndStateReducer<Lectures>(UNIVERSITY_LECTURES),
    unsetCourseLectures: (state: Lectures, {payload: courseId}: PayloadAction<string>) => {
      const lectureIds = Object.values(state)
        .filter((lecture) => lecture.courseId === courseId)
        .map((lecture) => lecture.lectureId);

      for (const lectureId of lectureIds) {
        delete state[lectureId];
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    unsetLecture: (state: Lectures, {payload: lectureId}: PayloadAction<string>) => {
      const courseId = state[lectureId].courseId;
      delete state[lectureId];

      let courseLectureList = Object.values(state).filter((lecture) => lecture.courseId === courseId);
      courseLectureList = orderBy(courseLectureList, ['position']);

      let position = 0;

      for (const lecture of courseLectureList) {
        state[lecture.lectureId].position = position;
        position += 1;
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    unsetLectures: (state: Lectures, {payload: lectureIds}: PayloadAction<string[]>) => {
      for (const lectureId of lectureIds) {
        if (state[lectureId]) delete state[lectureId];
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    unsetLecturesFromCourseIds: (state: Lectures, {payload: courseIds}: PayloadAction<string[]>) => {
      const _lectures = Object.values(state);

      for (const courseId of courseIds) {
        const lectureIds = _lectures
          .filter((lecture) => lecture.courseId === courseId)
          .map((lecture) => lecture.lectureId);

        for (const lectureId of lectureIds) delete state[lectureId];
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    updateLecturePositions: (state: Lectures, {payload}: PayloadAction<{lectureId: string; position: number}[]>) => {
      for (const item of payload) state[item.lectureId].position = item.position;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
  },
});

export const {
  setLecture,
  setLectureList,
  setLectures,
  unsetCourseLectures,
  unsetLecture,
  unsetLectures,
  unsetLecturesFromCourseIds,
  updateLecturePositions,
} = lectures.actions;
export default lectures.reducer;
