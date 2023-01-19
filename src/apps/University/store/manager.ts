import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {Manager, Page} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Manager = {
  activeLearnCourseId: null,
  activeLearnLectureId: null,
  activePage: Page.learnBrowse,
  activeTeachCourseId: null,
  activeTeachLectureId: null,
};

const manager = createSlice({
  initialState,
  name: UNIVERSITY_MANAGER,
  reducers: {
    setActiveLearnCourseId: (state: Manager, {payload: activeLearnCourseId}: PayloadAction<string | null>) => {
      state.activeLearnCourseId = activeLearnCourseId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setActiveLearnLectureId: (state: Manager, {payload: activeLearnLectureId}: PayloadAction<string | null>) => {
      state.activeLearnLectureId = activeLearnLectureId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setActivePage: (state: Manager, {payload: activePage}: PayloadAction<Page>) => {
      state.activePage = activePage;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setActiveTeachCourseId: (state: Manager, {payload: activeTeachCourseId}: PayloadAction<string | null>) => {
      state.activeTeachCourseId = activeTeachCourseId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setActiveTeachLectureId: (state: Manager, {payload: activeTeachLectureId}: PayloadAction<string | null>) => {
      state.activeTeachLectureId = activeTeachLectureId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setManager: setLocalAndStateReducer<Manager>(UNIVERSITY_MANAGER),
  },
});

export const {
  setActiveLearnCourseId,
  setActiveLearnLectureId,
  setActivePage,
  setActiveTeachCourseId,
  setActiveTeachLectureId,
  setManager,
} = manager.actions;
export default manager.reducer;
