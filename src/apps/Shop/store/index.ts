import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/Shop/store/manager';
import productsReducer from 'apps/Shop/store/products';

const shopReducer = combineReducers({
  manager: managerReducer,
  products: productsReducer,
});

export default shopReducer;
