import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_OFFERS} from 'apps/Trade/store/constants';
import {Offer} from 'apps/Trade/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Offer[] = [];

const offers = createSlice({
  initialState,
  name: TRADE_OFFERS,
  reducers: {
    setOffer: (state: Offer[], {payload}: PayloadAction<Offer>) => {
      const index = state.findIndex(({clientAsset, host, hostAsset}) => {
        return clientAsset === payload.clientAsset && host === payload.host && hostAsset === payload.hostAsset;
      });
      if (index !== -1) state.splice(index, 1);
      state.push(payload);
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_OFFERS, state: current(state)});
    },
    setOffers: setLocalAndStateReducer<Offer[]>(TRADE_OFFERS),
    unsetOffer: (state: Offer[], {payload}: PayloadAction<{clientAsset: string; host: string; hostAsset: string}>) => {
      const index = state.findIndex(({clientAsset, host, hostAsset}) => {
        return clientAsset === payload.clientAsset && host === payload.host && hostAsset === payload.hostAsset;
      });
      if (index !== -1) state.splice(index, 1);
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_OFFERS, state: current(state)});
    },
    updatePurchaseTermsEnabled: (
      state: Offer[],
      {payload}: PayloadAction<{clientAsset: string; host: string; hostAsset: string}>,
    ) => {
      const offer = state.find(({clientAsset, host, hostAsset}) => {
        return clientAsset === payload.clientAsset && host === payload.host && hostAsset === payload.hostAsset;
      });
      if (offer) offer.purchaseTerms.enabled = !offer.purchaseTerms.enabled;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_OFFERS, state: current(state)});
    },
    updateSaleTermsEnabled: (
      state: Offer[],
      {payload}: PayloadAction<{clientAsset: string; host: string; hostAsset: string}>,
    ) => {
      const offer = state.find(({clientAsset, host, hostAsset}) => {
        return clientAsset === payload.clientAsset && host === payload.host && hostAsset === payload.hostAsset;
      });
      if (offer) offer.saleTerms.enabled = !offer.saleTerms.enabled;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: TRADE_OFFERS, state: current(state)});
    },
  },
});

export const {setOffer, setOffers, unsetOffer, updatePurchaseTermsEnabled, updateSaleTermsEnabled} = offers.actions;
export default offers.reducer;
