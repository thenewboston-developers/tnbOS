import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_PRODUCT_RECORDS} from 'apps/Shop/store/constants';
import {ProductRecord, ProductRecords} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {currentSystemDate} from 'system/utils/dates';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: ProductRecords = {};

const productRecords = createSlice({
  initialState,
  name: SHOP_PRODUCT_RECORDS,
  reducers: {
    setIncomingProductRecord: (
      state: ProductRecords,
      {payload}: PayloadAction<{productRecord: ProductRecord; seller: string}>,
    ) => {
      const {productRecord, seller} = payload;
      state[seller] = productRecord;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_PRODUCT_RECORDS, state: current(state)});
    },
    setProductRecords: setLocalAndStateReducer<ProductRecords>(SHOP_PRODUCT_RECORDS),
    setSelfProductRecord: (
      state: ProductRecords,
      {payload}: PayloadAction<{modifiedDate: string; productId: string; seller: string}>,
    ) => {
      const {modifiedDate, productId, seller} = payload;

      if (!!state[seller]) {
        state[seller].productModifiedDates[productId] = modifiedDate;
        state[seller].recordModifiedDate = modifiedDate;
      } else {
        state[seller] = {
          productModifiedDates: {
            [productId]: modifiedDate,
          },
          recordModifiedDate: modifiedDate,
        };
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_PRODUCT_RECORDS, state: current(state)});
    },
    unsetProductRecord: (state: ProductRecords, {payload}: PayloadAction<{productId: string; seller: string}>) => {
      const {productId, seller} = payload;

      if (!!state[seller]) {
        delete state[seller].productModifiedDates[productId];
        state[seller].recordModifiedDate = currentSystemDate();
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_PRODUCT_RECORDS, state: current(state)});
    },
  },
});

export const {setProductRecords, setIncomingProductRecord, setSelfProductRecord, unsetProductRecord} =
  productRecords.actions;
export default productRecords.reducer;
