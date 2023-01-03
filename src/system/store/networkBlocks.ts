import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {Block, IpcChannel} from 'shared/types';
import {SYSTEM_NETWORK_BLOCKS} from 'system/store/constants';
import {NetworkBlocks} from 'system/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: NetworkBlocks = {};

const networkBlocks = createSlice({
  initialState,
  name: SYSTEM_NETWORK_BLOCKS,
  reducers: {
    setNetworkBlock: (state: NetworkBlocks, {payload}: PayloadAction<{block: Block; networkId: string}>) => {
      const {block, networkId} = payload;
      const {id: blockId} = block;

      if (!state[networkId]) state[networkId] = {};
      state[networkId][blockId] = block;

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_NETWORK_BLOCKS, state: current(state)});
    },
    setNetworkBlocks: setLocalAndStateReducer<NetworkBlocks>(SYSTEM_NETWORK_BLOCKS),
  },
});

export const {setNetworkBlock, setNetworkBlocks} = networkBlocks.actions;
export default networkBlocks.reducer;
