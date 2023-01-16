import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

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
    setLectures: setLocalAndStateReducer<Lectures>(UNIVERSITY_LECTURES),
    unsetLecture: (state: Lectures, {payload: lectureId}: PayloadAction<string>) => {
      delete state[lectureId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
  },
});

export const {setLecture, setLectures, unsetLecture} = lectures.actions;
export default lectures.reducer;
