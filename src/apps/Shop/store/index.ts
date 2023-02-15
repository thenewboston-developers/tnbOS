import {combineReducers} from '@reduxjs/toolkit';

import addressesReducer from 'apps/Shop/store/addresses';
import cartProductsReducer from 'apps/Shop/store/cartProducts';
import managerReducer from 'apps/Shop/store/manager';
import orderProductsReducer from 'apps/Shop/store/orderProducts';
import ordersReducer from 'apps/Shop/store/orders';
import productRecordRecipientsRecordsReducer from 'apps/Shop/store/productRecordRecipients';
import productRecordsReducer from 'apps/Shop/store/productRecords';
import productsReducer from 'apps/Shop/store/products';
import receivingAccountsReducer from 'apps/Shop/store/receivingAccounts';
import transactionsReducer from 'apps/Shop/store/transactions';

const shopReducer = combineReducers({
  addresses: addressesReducer,
  cartProducts: cartProductsReducer,
  manager: managerReducer,
  orderProducts: orderProductsReducer,
  orders: ordersReducer,
  productRecordRecipients: productRecordRecipientsRecordsReducer,
  productRecords: productRecordsReducer,
  products: productsReducer,
  receivingAccounts: receivingAccountsReducer,
  transactions: transactionsReducer,
});

export default shopReducer;
