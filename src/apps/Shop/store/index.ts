import {combineReducers} from '@reduxjs/toolkit';

import addressesReducer from 'apps/Shop/store/addresses';
import cartProductsReducer from 'apps/Shop/store/cartProducts';
import managerReducer from 'apps/Shop/store/manager';
import ordersReducer from 'apps/Shop/store/orders';
import productsReducer from 'apps/Shop/store/products';

const shopReducer = combineReducers({
  addresses: addressesReducer,
  cartProducts: cartProductsReducer,
  manager: managerReducer,
  orders: ordersReducer,
  products: productsReducer,
});

export default shopReducer;
