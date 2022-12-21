import {setQueuedBlock} from 'apps/Art/store/artworks';
import {queuedBlockValidator} from 'apps/Art/validators/queuedBlockValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setQueuedBlocks = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload} = block;
      const {params: queuedBlocks} = payload;

      for (const queuedBlock of queuedBlocks) {
        await queuedBlockValidator.validate(queuedBlock);
        dispatch(setQueuedBlock(queuedBlock));
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setQueuedBlocks;
