import {setQueuedBlocks} from 'apps/Art/listeners';
import {ArtFn} from 'apps/Art/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [ArtFn.setQueuedBlocks]: setQueuedBlocks,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown art function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;
