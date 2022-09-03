import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SYSTEM_NETWORK_CORRELATION_IDS} from 'system/store/constants';
import {NetworkCorrelationIds, SocketDataInternalMethod} from 'system/types';

export const initialState: NetworkCorrelationIds = {};

const networkCorrelationIds = createSlice({
  initialState,
  name: SYSTEM_NETWORK_CORRELATION_IDS,
  reducers: {
    deleteNetworkCorrelationId: (
      state: NetworkCorrelationIds,
      {payload}: PayloadAction<{correlation_id: string; networkId: string}>,
    ) => {
      const {correlation_id, networkId} = payload;
      delete state[networkId][correlation_id];
    },
    setNetworkCorrelationId: (
      state: NetworkCorrelationIds,
      {
        payload,
      }: PayloadAction<{correlation_id: string; networkId: string; socketDataInternalMethod: SocketDataInternalMethod}>,
    ) => {
      const {correlation_id, networkId, socketDataInternalMethod} = payload;
      const networkDict = state[networkId];
      if (!networkDict) state[networkId] = {};
      state[networkId][correlation_id] = socketDataInternalMethod;
    },
  },
});

export const {deleteNetworkCorrelationId, setNetworkCorrelationId} = networkCorrelationIds.actions;
export default networkCorrelationIds.reducer;
