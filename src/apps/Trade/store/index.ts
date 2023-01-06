import {combineReducers} from '@reduxjs/toolkit';

import holdingAccountsReducer from 'apps/Trade/store/holdingAccounts';
import managerReducer from 'apps/Trade/store/manager';
import offersReducer from 'apps/Trade/store/offers';
import offersSyncReducer from 'apps/Trade/store/offersSync';
import orderErrorsReducer from 'apps/Trade/store/orderErrors';
import ordersReducer from 'apps/Trade/store/orders';
import receivingAccountsReducer from 'apps/Trade/store/receivingAccounts';
import remoteOffersReducer from 'apps/Trade/store/remoteOffers';
import resolutionsReducer from 'apps/Trade/store/resolutions';
import transactionsReducer from 'apps/Trade/store/transactions';

const tradeReducer = combineReducers({
  holdingAccounts: holdingAccountsReducer,
  manager: managerReducer,
  offers: offersReducer,
  offersSync: offersSyncReducer,
  orderErrors: orderErrorsReducer,
  orders: ordersReducer,
  receivingAccounts: receivingAccountsReducer,
  remoteOffers: remoteOffersReducer,
  resolutions: resolutionsReducer,
  transactions: transactionsReducer,
});

export default tradeReducer;
