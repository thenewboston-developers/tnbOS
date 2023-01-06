import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_ORDER_ERRORS} from 'apps/Trade/store/constants';
import {OrderError, OrderErrors} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: OrderErrors = {};

const orderErrors = createSlice({
  initialState,
  name: TRADE_ORDER_ERRORS,
  reducers: {
    setOrderError: (state: OrderErrors, {payload}: PayloadAction<OrderError>) => {
      const {orderErrorId, orderId} = payload;
      if (!state[orderId]) state[orderId] = {};
      state[orderId][orderErrorId] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_ORDER_ERRORS, state: current(state)});
    },
    setOrderErrors: setLocalAndStateReducer<OrderErrors>(TRADE_ORDER_ERRORS),
  },
});

export const {setOrderError, setOrderErrors} = orderErrors.actions;
export default orderErrors.reducer;
