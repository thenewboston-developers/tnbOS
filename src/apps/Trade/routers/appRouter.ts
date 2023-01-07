import {
  approveOrderListener,
  createOrderListener,
  setOffersListener,
  setOffersReceiptListener,
  setPaymentStatusListener,
} from 'apps/Trade/listeners';
import {TradeFn} from 'apps/Trade/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [TradeFn.approveOrder]: approveOrderListener,
    [TradeFn.createOrder]: createOrderListener,
    [TradeFn.setOffers]: setOffersListener,
    [TradeFn.setOffersReceipt]: setOffersReceiptListener,
    [TradeFn.setPaymentStatus]: setPaymentStatusListener,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown trade function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;
