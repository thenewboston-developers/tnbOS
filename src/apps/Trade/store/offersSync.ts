import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_OFFERS_SYNC} from 'apps/Trade/store/constants';
import {OffersSync, SyncRecipient} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

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
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_OFFERS_SYNC, state: current(state)});
    },
    setOffersSync: setLocalAndStateReducer<OffersSync>(TRADE_OFFERS_SYNC),
    setOffersSyncRecipient: (state: OffersSync, {payload}: PayloadAction<SyncRecipient>) => {
      const {accountNumber} = payload;
      state.recipients[accountNumber] = payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_OFFERS_SYNC, state: current(state)});
    },
  },
});

export const {resetOffersSync, setOffersSync, setOffersSyncRecipient} = offersSync.actions;
export default offersSync.reducer;
