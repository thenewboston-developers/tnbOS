import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_TRANSACTIONS} from 'apps/Shop/store/constants';
import {Transaction, Transactions} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Transactions = {};

const transactions = createSlice({
  initialState,
  name: SHOP_TRANSACTIONS,
  reducers: {
    setTransaction: (state: Transactions, {payload: transaction}: PayloadAction<Transaction>) => {
      const {id: blockId, orderId, networkId} = transaction;
      if (!state[orderId]) state[orderId] = {};
      if (!state[orderId][networkId]) state[orderId][networkId] = {};
      state[orderId][networkId][blockId] = transaction;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_TRANSACTIONS, state: current(state)});
    },
    setTransactions: setLocalAndStateReducer<Transactions>(SHOP_TRANSACTIONS),
  },
});

export const {setTransaction, setTransactions} = transactions.actions;
export default transactions.reducer;
