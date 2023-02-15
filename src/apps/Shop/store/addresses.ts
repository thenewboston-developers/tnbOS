import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_ADDRESSES} from 'apps/Shop/store/constants';
import {Address, Addresses} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Addresses = {};

const addresses = createSlice({
  initialState,
  name: SHOP_ADDRESSES,
  reducers: {
    setAddress: (state: Addresses, {payload: address}: PayloadAction<Address>) => {
      const {addressId} = address;
      state[addressId] = address;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ADDRESSES, state: current(state)});
    },
    setAddresses: setLocalAndStateReducer<Addresses>(SHOP_ADDRESSES),
    unsetAddress: (state: Addresses, {payload: addressId}: PayloadAction<string>) => {
      delete state[addressId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ADDRESSES, state: current(state)});
    },
  },
});

export const {setAddress, setAddresses, unsetAddress} = addresses.actions;
export default addresses.reducer;
