import {SHOP_MANAGER, SHOP_PRODUCTS} from 'apps/Shop/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Shop/store/manager';
import {initialState as productsInitialState, setProducts} from 'apps/Shop/store/products';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[SHOP_MANAGER] || managerInitialState;
  const products = store?.[SHOP_PRODUCTS] || productsInitialState;
  dispatch(setManager(manager));
  dispatch(setProducts(products));
};

export default loadAppData;
