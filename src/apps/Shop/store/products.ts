import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_PRODUCTS} from 'apps/Shop/store/constants';
import {Product, Products} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Products = {};

const products = createSlice({
  initialState,
  name: SHOP_PRODUCTS,
  reducers: {
    setProduct: (state: Products, {payload: product}: PayloadAction<Product>) => {
      const {productId} = product;
      state[productId] = product;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_PRODUCTS, state: current(state)});
    },
    setProducts: setLocalAndStateReducer<Products>(SHOP_PRODUCTS),
    unsetProduct: (state: Products, {payload: productId}: PayloadAction<string>) => {
      delete state[productId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_PRODUCTS, state: current(state)});
    },
    unsetProducts: (state: Products, {payload: productIds}: PayloadAction<string[]>) => {
      for (const productId of productIds) {
        if (state[productId]) delete state[productId];
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_PRODUCTS, state: current(state)});
    },
  },
});

export const {setProduct, setProducts, unsetProduct, unsetProducts} = products.actions;
export default products.reducer;
