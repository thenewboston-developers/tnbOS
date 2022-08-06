import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {IpcChannel} from 'shared/types';
import {SYSTEM_ACCOUNTS} from 'system/store/constants';
import {Account, Accounts} from 'system/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Accounts = {};

const accounts = createSlice({
  initialState,
  name: SYSTEM_ACCOUNTS,
  reducers: {
    deleteAccount: (state: Accounts, {payload: accountNumber}: PayloadAction<string>) => {
      delete state[accountNumber];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_ACCOUNTS, state: current(state)});
    },
    setAccount: (state: Accounts, {payload}: PayloadAction<Account>) => {
      const {accountNumber} = payload;
      state[accountNumber] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_ACCOUNTS, state: current(state)});
    },
    setAccounts: setLocalAndStateReducer<Accounts>(SYSTEM_ACCOUNTS),
  },
});

export const {deleteAccount, setAccount, setAccounts} = accounts.actions;
export default accounts.reducer;
