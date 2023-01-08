import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_TRANSACTIONS} from 'apps/Trade/store/constants';
import {Transaction, Transactions} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Transactions = {};

const transactions = createSlice({
  initialState,
  name: TRADE_TRANSACTIONS,
  reducers: {
    setTransaction: (state: Transactions, {payload: transaction}: PayloadAction<Transaction>) => {
      const {id: blockId, orderId, networkId} = transaction;
      if (!state[orderId]) state[orderId] = {};
      if (!state[orderId][networkId]) state[orderId][networkId] = {};
      state[orderId][networkId][blockId] = transaction;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_TRANSACTIONS, state: current(state)});
    },
    setTransactions: setLocalAndStateReducer<Transactions>(TRADE_TRANSACTIONS),
  },
});

export const {setTransaction, setTransactions} = transactions.actions;
export default transactions.reducer;
