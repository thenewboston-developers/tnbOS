import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_ORDER_PRODUCTS} from 'apps/Shop/store/constants';
import {Product, Products} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Products = {};

const orderProducts = createSlice({
  initialState,
  name: SHOP_ORDER_PRODUCTS,
  reducers: {
    setOrderProductList: (state: Products, {payload: productList}: PayloadAction<Product[]>) => {
      for (const product of productList) {
        const {productId} = product;
        state[productId] = product;
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ORDER_PRODUCTS, state: current(state)});
    },
    setOrderProducts: setLocalAndStateReducer<Products>(SHOP_ORDER_PRODUCTS),
    unsetOrderProducts: (state: Products, {payload: productIds}: PayloadAction<string[]>) => {
      for (const productId of productIds) {
        if (state[productId]) delete state[productId];
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_ORDER_PRODUCTS, state: current(state)});
    },
  },
});

export const {setOrderProductList, setOrderProducts} = orderProducts.actions;
export default orderProducts.reducer;
