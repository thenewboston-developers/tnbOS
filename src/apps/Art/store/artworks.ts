import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {ART_ARTWORKS} from 'apps/Art/store/constants';
import {Artworks, QueuedBlock} from 'apps/Art/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Artworks = {};

const artworks = createSlice({
  initialState,
  name: ART_ARTWORKS,
  reducers: {
    deleteQueuedBlock: (state: Artworks, {payload: block}: PayloadAction<QueuedBlock>) => {
      const {payload} = block;
      const {artworkId, blockId} = payload;
      delete state[artworkId].blockQueue[blockId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: ART_ARTWORKS, state: current(state)});
    },
    setArtworks: setLocalAndStateReducer<Artworks>(ART_ARTWORKS),
    setBlockQueueNeedsProcessing: (
      state: Artworks,
      {payload}: PayloadAction<{artworkId: string; blockQueueNeedsProcessing: boolean}>,
    ) => {
      const {artworkId, blockQueueNeedsProcessing} = payload;
      state[artworkId].blockQueueNeedsProcessing = blockQueueNeedsProcessing;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: ART_ARTWORKS, state: current(state)});
    },
    setQueuedBlock: (state: Artworks, {payload: block}: PayloadAction<QueuedBlock>) => {
      const {payload} = block;
      const {artworkId, blockId} = payload;

      if (!state[artworkId]) {
        state[artworkId] = {
          attributes: {},
          blockChain: {},
          blockQueue: {},
          blockQueueNeedsProcessing: true,
          headBlockSignature: null,
        };
      }

      const blockQueue = state[artworkId].blockQueue;
      blockQueue[blockId] = block;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: ART_ARTWORKS, state: current(state)});
    },
  },
});

export const {deleteQueuedBlock, setArtworks, setBlockQueueNeedsProcessing, setQueuedBlock} = artworks.actions;
export default artworks.reducer;
