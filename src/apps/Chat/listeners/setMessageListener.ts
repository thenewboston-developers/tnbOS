import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setMessageListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      console.log(2);
      console.log(block);
      console.log(dispatch);
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setMessageListener;
