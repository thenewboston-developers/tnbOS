import {combineReducers} from '@reduxjs/toolkit';

import addressesReducer from 'apps/Shop/store/addresses';
import cartProductsReducer from 'apps/Shop/store/cartProducts';
import managerReducer from 'apps/Shop/store/manager';
import ordersReducer from 'apps/Shop/store/orders';
import productRecordsReducer from 'apps/Shop/store/productRecords';
import productsReducer from 'apps/Shop/store/products';

const shopReducer = combineReducers({
  addresses: addressesReducer,
  cartProducts: cartProductsReducer,
  manager: managerReducer,
  orders: ordersReducer,
  productRecords: productRecordsReducer,
  products: productsReducer,
});

export default shopReducer;
