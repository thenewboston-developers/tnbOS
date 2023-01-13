import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {LearnPage, Manager, Tab, TeachPage} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Manager = {
  activeLearnPage: LearnPage.browse,
  activeTab: Tab.learn,
  activeTeachPage: TeachPage.dashboard,
};

const manager = createSlice({
  initialState,
  name: UNIVERSITY_MANAGER,
  reducers: {
    setActiveLearnPage: (state: Manager, {payload: learnPage}: PayloadAction<LearnPage>) => {
      state.activeLearnPage = learnPage;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setActiveTab: (state: Manager, {payload: activeTab}: PayloadAction<Tab>) => {
      state.activeTab = activeTab;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setActiveTeachPage: (state: Manager, {payload: teachPage}: PayloadAction<TeachPage>) => {
      state.activeTeachPage = teachPage;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setManager: setLocalAndStateReducer<Manager>(UNIVERSITY_MANAGER),
  },
});

export const {setActiveLearnPage, setActiveTab, setActiveTeachPage, setManager} = manager.actions;
export default manager.reducer;
