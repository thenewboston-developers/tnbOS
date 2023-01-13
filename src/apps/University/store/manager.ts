import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {Manager, Tab} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Manager = {
  activeTab: Tab.learn,
};

const manager = createSlice({
  initialState,
  name: UNIVERSITY_MANAGER,
  reducers: {
    setActiveTab: (state: Manager, {payload: activeTab}: PayloadAction<Tab>) => {
      state.activeTab = activeTab;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_MANAGER, state: current(state)});
    },
    setManager: setLocalAndStateReducer<Manager>(UNIVERSITY_MANAGER),
  },
});

export const {setActiveTab, setManager} = manager.actions;
export default manager.reducer;
