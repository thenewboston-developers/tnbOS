import noop from 'lodash/noop';

import setMessageListener from 'apps/Chat/listeners/setMessageListener';
import {ChatFn} from 'apps/Chat/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [ChatFn.setMessage]: setMessageListener,
    [ChatFn.setMessageReceipt]: noop,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown chat function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;
