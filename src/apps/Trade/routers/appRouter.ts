import {setOffersListener} from 'apps/Trade/listeners';
import {TradeFn} from 'apps/Trade/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [TradeFn.setOffers]: setOffersListener,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown trade function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;