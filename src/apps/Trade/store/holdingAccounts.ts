import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_HOLDING_ACCOUNTS} from 'apps/Trade/store/constants';
import {HoldingAccount, HoldingAccounts} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: HoldingAccounts = {};

const holdingAccounts = createSlice({
  initialState,
  name: TRADE_HOLDING_ACCOUNTS,
  reducers: {
    setHoldingAccount: (state: HoldingAccounts, {payload: holdingAccount}: PayloadAction<HoldingAccount>) => {
      const {networkId, orderId} = holdingAccount;
      if (!state[networkId]) state[networkId] = {};
      state[networkId][orderId] = holdingAccount;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_HOLDING_ACCOUNTS, state: current(state)});
    },
    setHoldingAccounts: setLocalAndStateReducer<HoldingAccounts>(TRADE_HOLDING_ACCOUNTS),
  },
});

export const {setHoldingAccount, setHoldingAccounts} = holdingAccounts.actions;
export default holdingAccounts.reducer;
