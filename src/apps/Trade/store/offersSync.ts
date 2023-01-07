import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_OFFERS_SYNC} from 'apps/Trade/store/constants';
import {OffersSync, SyncRecipient} from 'apps/Trade/types';

export const initialState: OffersSync = {
  modifiedDate: null,
  recipients: {},
};

const offersSync = createSlice({
  initialState,
  name: TRADE_OFFERS_SYNC,
  reducers: {
    resetOffersSync: (state: OffersSync, {payload}: PayloadAction<string>) => {
      state.modifiedDate = payload;
      state.recipients = {};
    },
    setOffersSyncRecipient: (state: OffersSync, {payload}: PayloadAction<SyncRecipient>) => {
      const {accountNumber} = payload;
      state.recipients[accountNumber] = payload;
    },
  },
});

export const {resetOffersSync, setOffersSyncRecipient} = offersSync.actions;
export default offersSync.reducer;
