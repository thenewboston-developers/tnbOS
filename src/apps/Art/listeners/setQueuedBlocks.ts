import {setQueuedBlock} from 'apps/Art/store/artworks';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setQueuedBlocks = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload} = block;
      const {params: queuedBlocks} = payload;

      // TODO: Remove
      console.log(networkId);

      for (const queuedBlock of queuedBlocks) {
        dispatch(setQueuedBlock(queuedBlock));
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setQueuedBlocks;
