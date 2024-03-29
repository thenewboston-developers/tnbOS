import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {IpcChannel} from 'shared/types';
import {SYSTEM_NETWORKS} from 'system/store/constants';
import {Network, Networks} from 'system/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Networks = {};

const networks = createSlice({
  initialState,
  name: SYSTEM_NETWORKS,
  reducers: {
    _deleteNetwork: (state: Networks, {payload: networkId}: PayloadAction<string>) => {
      delete state[networkId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_NETWORKS, state: current(state)});
    },
    setNetwork: (state: Networks, {payload}: PayloadAction<Network>) => {
      const {networkId} = payload;
      state[networkId] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_NETWORKS, state: current(state)});
    },
    setNetworks: setLocalAndStateReducer<Networks>(SYSTEM_NETWORKS),
  },
});

export const {_deleteNetwork, setNetwork, setNetworks} = networks.actions;
export default networks.reducer;
