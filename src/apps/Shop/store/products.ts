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
  },
});

export const {setProduct, setProducts} = products.actions;
export default products.reducer;
