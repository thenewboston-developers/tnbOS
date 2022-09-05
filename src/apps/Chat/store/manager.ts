import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {CHAT_MANAGER} from 'apps/Chat/store/constants';
import {Manager} from 'apps/Chat/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Manager = {
  activeChat: null,
  activeNetworkId: null,
};

const manager = createSlice({
  initialState,
  name: CHAT_MANAGER,
  reducers: {
    setActiveChat: (state: Manager, {payload: accountNumber}: PayloadAction<string>) => {
      state.activeChat = accountNumber;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_MANAGER, state: current(state)});
    },
    setActiveNetworkId: (state: Manager, {payload: networkId}: PayloadAction<string | null>) => {
      state.activeNetworkId = networkId;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_MANAGER, state: current(state)});
    },
    setManager: setLocalAndStateReducer<Manager>(CHAT_MANAGER),
  },
});

export const {setActiveChat, setActiveNetworkId, setManager} = manager.actions;
export default manager.reducer;
