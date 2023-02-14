import {createOrderValidator} from 'apps/Shop/validators/createOrderValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const createOrderListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await createOrderValidator.validate(params);

      console.log(blockSender);
      console.log(dispatch);
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default createOrderListener;
