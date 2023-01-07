import {
  TRADE_HOLDING_ACCOUNTS,
  TRADE_MANAGER,
  TRADE_OFFERS,
  TRADE_OFFERS_SYNC,
  TRADE_ORDER_ERRORS,
  TRADE_ORDERS,
  TRADE_RECEIVING_ACCOUNTS,
  TRADE_RESOLUTIONS,
  TRADE_TRANSACTIONS,
} from 'apps/Trade/store/constants';
import {initialState as holdingAccountsInitialState, setHoldingAccounts} from 'apps/Trade/store/holdingAccounts';
import {initialState as managerInitialState, setManager} from 'apps/Trade/store/manager';
import {initialState as offersInitialState, setOffers} from 'apps/Trade/store/offers';
import {initialState as offersSyncInitialState, setOffersSync} from 'apps/Trade/store/offersSync';
import {initialState as orderErrorsInitialState, setOrderErrors} from 'apps/Trade/store/orderErrors';
import {initialState as ordersInitialState, setOrders} from 'apps/Trade/store/orders';
import {initialState as receivingAccountsInitialState, setReceivingAccounts} from 'apps/Trade/store/receivingAccounts';
import {initialState as resolutionsInitialState, setResolutions} from 'apps/Trade/store/resolutions';
import {initialState as transactionsInitialState, setTransactions} from 'apps/Trade/store/transactions';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const holdingAccounts = store?.[TRADE_HOLDING_ACCOUNTS] || holdingAccountsInitialState;
  const manager = store?.[TRADE_MANAGER] || managerInitialState;
  const offers = store?.[TRADE_OFFERS] || offersInitialState;
  const offersSync = store?.[TRADE_OFFERS_SYNC] || offersSyncInitialState;
  const orderErrors = store?.[TRADE_ORDER_ERRORS] || orderErrorsInitialState;
  const orders = store?.[TRADE_ORDERS] || ordersInitialState;
  const receivingAccounts = store?.[TRADE_RECEIVING_ACCOUNTS] || receivingAccountsInitialState;
  const resolutions = store?.[TRADE_RESOLUTIONS] || resolutionsInitialState;
  const transactions = store?.[TRADE_TRANSACTIONS] || transactionsInitialState;
  dispatch(setHoldingAccounts(holdingAccounts));
  dispatch(setManager(manager));
  dispatch(setOffers(offers));
  dispatch(setOffersSync(offersSync));
  dispatch(setOrderErrors(orderErrors));
  dispatch(setOrders(orders));
  dispatch(setReceivingAccounts(receivingAccounts));
  dispatch(setResolutions(resolutions));
  dispatch(setTransactions(transactions));
};

export default loadAppData;
