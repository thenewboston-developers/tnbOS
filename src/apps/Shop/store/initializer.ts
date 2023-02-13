import {initialState as addressesInitialState, setAddresses} from 'apps/Shop/store/addresses';
import {initialState as cartProductsInitialState, setCartProducts} from 'apps/Shop/store/cartProducts';
import {
  SHOP_ADDRESSES,
  SHOP_CART_PRODUCTS,
  SHOP_MANAGER,
  SHOP_ORDERS,
  SHOP_PRODUCT_RECORDS,
  SHOP_PRODUCTS,
} from 'apps/Shop/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Shop/store/manager';
import {initialState as ordersInitialState, setOrders} from 'apps/Shop/store/orders';
import {initialState as productRecordsInitialState, setProductRecords} from 'apps/Shop/store/productRecords';
import {initialState as productsInitialState, setProducts} from 'apps/Shop/store/products';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const addresses = store?.[SHOP_ADDRESSES] || addressesInitialState;
  const cartProducts = store?.[SHOP_CART_PRODUCTS] || cartProductsInitialState;
  const manager = store?.[SHOP_MANAGER] || managerInitialState;
  const orders = store?.[SHOP_ORDERS] || ordersInitialState;
  const productRecords = store?.[SHOP_PRODUCT_RECORDS] || productRecordsInitialState;
  const products = store?.[SHOP_PRODUCTS] || productsInitialState;
  dispatch(setAddresses(addresses));
  dispatch(setCartProducts(cartProducts));
  dispatch(setManager(manager));
  dispatch(setOrders(orders));
  dispatch(setProductRecords(productRecords));
  dispatch(setProducts(products));
};

export default loadAppData;
