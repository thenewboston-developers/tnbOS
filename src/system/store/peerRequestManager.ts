import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SYSTEM_PEER_REQUEST_MANAGER} from 'system/store/constants';
import {PeerRequestDetails, PeerRequestManager} from 'system/types';

const initialPeerRequestDetails: PeerRequestDetails = {
  lastRequestDate: null,
  lastRequestId: null,
  lastResponseId: null,
};

export const initialState: PeerRequestManager = {};

const peerRequestManager = createSlice({
  initialState,
  name: SYSTEM_PEER_REQUEST_MANAGER,
  reducers: {
    initializeNetworkPeerRequests: (state: PeerRequestManager, {payload: networkId}: PayloadAction<string>) => {
      state[networkId] = {
        getPeers: initialPeerRequestDetails,
        networkId,
        setPeers: initialPeerRequestDetails,
      };
    },
  },
});

export const {initializeNetworkPeerRequests} = peerRequestManager.actions;
export default peerRequestManager.reducer;
