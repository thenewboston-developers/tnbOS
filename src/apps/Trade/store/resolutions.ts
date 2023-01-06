import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_RESOLUTIONS} from 'apps/Trade/store/constants';
import {Resolution, Resolutions} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Resolutions = {};

const resolutions = createSlice({
  initialState,
  name: TRADE_RESOLUTIONS,
  reducers: {
    setResolution: (state: Resolutions, {payload}: PayloadAction<Resolution>) => {
      const {orderId} = payload;
      state[orderId] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_RESOLUTIONS, state: current(state)});
    },
    setResolutions: setLocalAndStateReducer<Resolutions>(TRADE_RESOLUTIONS),
  },
});

export const {setResolution, setResolutions} = resolutions.actions;
export default resolutions.reducer;
