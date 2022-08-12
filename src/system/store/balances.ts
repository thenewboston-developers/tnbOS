import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {IpcChannel} from 'shared/types';
import {SYSTEM_BALANCES} from 'system/store/constants';
import {Balances} from 'system/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Balances = {};

const balances = createSlice({
  initialState,
  name: SYSTEM_BALANCES,
  reducers: {
    deleteBalance: (state: Balances, {payload: networkId}: PayloadAction<string>) => {
      delete state[networkId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_BALANCES, state: current(state)});
    },
    initializeBalances: (state: Balances) => {
      for (const networkId of Object.keys(state)) {
        state[networkId] = 0;
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_BALANCES, state: current(state)});
    },
    setBalance: (state: Balances, {payload}: PayloadAction<{balance: number; networkId: string}>) => {
      const {balance, networkId} = payload;
      state[networkId] = balance;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_BALANCES, state: current(state)});
    },
    setBalances: setLocalAndStateReducer<Balances>(SYSTEM_BALANCES),
  },
});

export const {deleteBalance, initializeBalances, setBalance, setBalances} = balances.actions;
export default balances.reducer;
