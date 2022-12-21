import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setQueuedBlocks = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      console.log(block);
      console.log(dispatch);
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setQueuedBlocks;
