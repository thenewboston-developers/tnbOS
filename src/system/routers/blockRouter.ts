import store from 'system/store';
import {AppDispatch, SocketDataStandard} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {blockValidator} from 'system/validators/blockValidators';
import {validateIsSelfAccountNumber} from 'system/validators/common';

const blockRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      const {message: block} = await blockValidator.validate(socketData);
      validateIsSelfAccountNumber(block.recipient, self);

      console.log(block);
      console.log(dispatch);
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default blockRouter;
