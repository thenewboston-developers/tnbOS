import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {CHAT_DELIVERY_STATUSES} from 'apps/Chat/store/constants';
import {DeliveryStatus, DeliveryStatuses} from 'apps/Chat/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: DeliveryStatuses = {};

const deliveryStatuses = createSlice({
  initialState,
  name: CHAT_DELIVERY_STATUSES,
  reducers: {
    setDeliveryStatus: (
      state: DeliveryStatuses,
      {payload}: PayloadAction<{deliveryStatus: DeliveryStatus; messageId: string}>,
    ) => {
      const {deliveryStatus, messageId} = payload;
      state[messageId] = deliveryStatus;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: CHAT_DELIVERY_STATUSES, state: current(state)});
    },
    setDeliveryStatuses: setLocalAndStateReducer<DeliveryStatuses>(CHAT_DELIVERY_STATUSES),
  },
});

export const {setDeliveryStatus, setDeliveryStatuses} = deliveryStatuses.actions;
export default deliveryStatuses.reducer;
