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
    processQueuedBlock: (state: Artworks, {payload: block}: PayloadAction<QueuedBlock>) => {
      const {payload: blockPayload} = block;
      const {artworkId, blockId} = blockPayload;

      state[artworkId].attributes = {
        ...state[artworkId].attributes,
        ...blockPayload,
      };
      state[artworkId].blockChain[blockId] = block;
      delete state[artworkId].blockQueue[blockId];
      state[artworkId].headBlockSignature = block.signature;

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
      const {payload: blockPayload} = block;
      const {artworkId, blockId} = blockPayload;

      if (!state[artworkId]) {
        state[artworkId] = {
          attributes: {},
          blockChain: {},
          blockQueue: {},
          blockQueueNeedsProcessing: true,
          headBlockSignature: null,
        };
      }

      state[artworkId].blockQueue[blockId] = block;
      state[artworkId].blockQueueNeedsProcessing = true;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: ART_ARTWORKS, state: current(state)});
    },
  },
});

export const {deleteQueuedBlock, processQueuedBlock, setArtworks, setBlockQueueNeedsProcessing, setQueuedBlock} =
  artworks.actions;
export default artworks.reducer;
