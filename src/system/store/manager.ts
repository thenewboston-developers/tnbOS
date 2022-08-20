import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SYSTEM_MANAGER} from 'system/store/constants';
import {Manager} from 'system/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Manager = {
  activeApp: null,
};

const manager = createSlice({
  initialState,
  name: SYSTEM_MANAGER,
  reducers: {
    setActiveApp: (state: Manager, {payload: appId}: PayloadAction<string>) => {
      state.activeApp = appId === state.activeApp ? null : appId;
    },
    setManager: setLocalAndStateReducer<Manager>(SYSTEM_MANAGER),
  },
});

export const {setActiveApp, setManager} = manager.actions;
export default manager.reducer;
