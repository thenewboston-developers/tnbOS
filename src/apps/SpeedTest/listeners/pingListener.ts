import {pongBlock} from 'apps/SpeedTest/blocks';
import {pingValidator} from 'apps/SpeedTest/validators/pingValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const pingListener = (block: Block, _: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender} = block;
      const {params} = payload;

      await pingValidator.validate(params);

      await pongBlock({
        networkId,
        params,
        recipient: sender,
      });
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default pingListener;
