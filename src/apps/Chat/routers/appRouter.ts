import {setDeliveryStatusListener, setMessageListener} from 'apps/Chat/listeners';
import {ChatFn} from 'apps/Chat/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [ChatFn.setDeliveryStatus]: setDeliveryStatusListener,
    [ChatFn.setMessage]: setMessageListener,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown chat function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;
