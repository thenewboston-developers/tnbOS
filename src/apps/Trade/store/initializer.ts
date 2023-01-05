import {
  TRADE_MANAGER,
  TRADE_OFFERS,
  TRADE_OFFERS_SYNC,
  TRADE_ORDERS,
  TRADE_RECEIVING_ACCOUNTS,
} from 'apps/Trade/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Trade/store/manager';
import {initialState as offersInitialState, setOffers} from 'apps/Trade/store/offers';
import {initialState as offersSyncInitialState, setOffersSync} from 'apps/Trade/store/offersSync';
import {initialState as ordersInitialState, setOrders} from 'apps/Trade/store/orders';
import {initialState as receivingAccountsInitialState, setReceivingAccounts} from 'apps/Trade/store/receivingAccounts';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[TRADE_MANAGER] || managerInitialState;
  const offers = store?.[TRADE_OFFERS] || offersInitialState;
  const offersSync = store?.[TRADE_OFFERS_SYNC] || offersSyncInitialState;
  const orders = store?.[TRADE_ORDERS] || ordersInitialState;
  const receivingAccounts = store?.[TRADE_RECEIVING_ACCOUNTS] || receivingAccountsInitialState;
  dispatch(setManager(manager));
  dispatch(setOffers(offers));
  dispatch(setOffersSync(offersSync));
  dispatch(setOrders(orders));
  dispatch(setReceivingAccounts(receivingAccounts));
};

export default loadAppData;
