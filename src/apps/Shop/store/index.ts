import {combineReducers} from '@reduxjs/toolkit';

import addressesReducer from 'apps/Shop/store/addresses';
import managerReducer from 'apps/Shop/store/manager';
import productsReducer from 'apps/Shop/store/products';

const shopReducer = combineReducers({
  addresses: addressesReducer,
  manager: managerReducer,
  products: productsReducer,
});

export default shopReducer;
