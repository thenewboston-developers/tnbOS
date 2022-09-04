import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {CHAT_DELIVERIES} from 'apps/Chat/store/constants';
import {Deliveries, Delivery} from 'apps/Chat/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Deliveries = {};

const deliveries = createSlice({
  initialState,
  name: CHAT_DELIVERIES,
  reducers: {
    setDeliveries: setLocalAndStateReducer<Deliveries>(CHAT_DELIVERIES),
    setDelivery: (state: Deliveries, {payload}: PayloadAction<{delivery: Delivery; messageId: string}>) => {
      const {delivery, messageId} = payload;
      state[messageId] = delivery;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_DELIVERIES, state: current(state)});
    },
  },
});

export const {setDeliveries, setDelivery} = deliveries.actions;
export default deliveries.reducer;
