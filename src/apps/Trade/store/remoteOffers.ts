import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_REMOTE_OFFERS} from 'apps/Trade/store/constants';
import {Offer} from 'apps/Trade/types';

export const initialState: Offer[] = [];

const remoteOffers = createSlice({
  initialState,
  name: TRADE_REMOTE_OFFERS,
  reducers: {
    setHostsRemoteOffers: (state: Offer[], {payload}: PayloadAction<{host: string; offers: Offer[]}>) => {
      state = state.filter(({host}) => host !== payload.host);
      return [...state, ...payload.offers];
    },
  },
});

export const {setHostsRemoteOffers} = remoteOffers.actions;
export default remoteOffers.reducer;
