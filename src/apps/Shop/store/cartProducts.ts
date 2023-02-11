import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SHOP_CART_PRODUCTS} from 'apps/Shop/store/constants';
import {CartProduct, CartProducts} from 'apps/Shop/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: CartProducts = {};

const cartProducts = createSlice({
  initialState,
  name: SHOP_CART_PRODUCTS,
  reducers: {
    setCartProduct: (state: CartProducts, {payload: cartProduct}: PayloadAction<CartProduct>) => {
      const {productId} = cartProduct;
      state[productId] = cartProduct;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_CART_PRODUCTS, state: current(state)});
    },
    setCartProducts: setLocalAndStateReducer<CartProducts>(SHOP_CART_PRODUCTS),
    unsetCartProduct: (state: CartProducts, {payload: productId}: PayloadAction<string>) => {
      delete state[productId];
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SHOP_CART_PRODUCTS, state: current(state)});
    },
  },
});

export const {setCartProduct, setCartProducts, unsetCartProduct} = cartProducts.actions;
export default cartProducts.reducer;
