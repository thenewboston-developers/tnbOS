import {pingListener, pongListener} from 'apps/SpeedTest/listeners';
import {SpeedTestFn} from 'apps/SpeedTest/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [SpeedTestFn.ping]: pingListener,
    [SpeedTestFn.pong]: pongListener,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown speed test function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;
