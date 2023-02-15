import {
  approveOrderListener,
  createOrderListener,
  getProductListListener,
  setPaymentStatusListener,
  setProductListListener,
  setProductRecordListener,
  setProductRecordReceiptListener,
} from 'apps/Shop/listeners';
import {ShopFn} from 'apps/Shop/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [ShopFn.approveOrder]: approveOrderListener,
    [ShopFn.createOrder]: createOrderListener,
    [ShopFn.getProductList]: getProductListListener,
    [ShopFn.setPaymentStatus]: setPaymentStatusListener,
    [ShopFn.setProductList]: setProductListListener,
    [ShopFn.setProductRecord]: setProductRecordListener,
    [ShopFn.setProductRecordReceipt]: setProductRecordReceiptListener,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown shop function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;
