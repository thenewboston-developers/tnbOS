import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_RECEIVING_ACCOUNTS} from 'apps/Trade/store/constants';
import {ReceivingAccount, ReceivingAccounts} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: ReceivingAccounts = {};

const receivingAccounts = createSlice({
  initialState,
  name: TRADE_RECEIVING_ACCOUNTS,
  reducers: {
    setReceivingAccount: (state: ReceivingAccounts, {payload: receivingAccount}: PayloadAction<ReceivingAccount>) => {
      const {networkId, orderId} = receivingAccount;
      if (!state[networkId]) state[networkId] = {};
      state[networkId][orderId] = receivingAccount;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_RECEIVING_ACCOUNTS, state: current(state)});
    },
    setReceivingAccounts: setLocalAndStateReducer<ReceivingAccounts>(TRADE_RECEIVING_ACCOUNTS),
  },
});

export const {setReceivingAccount, setReceivingAccounts} = receivingAccounts.actions;
export default receivingAccounts.reducer;
