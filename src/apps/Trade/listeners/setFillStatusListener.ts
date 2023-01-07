import {setFillStatus} from 'apps/Trade/store/orders';
import {validateBlockSenderIsOrderHost, validateOrderExists} from 'apps/Trade/validators/common';
import {
  setFillStatusValidator,
  validateChangeInFillStatus,
  validateFill,
  validateFillStatusTransition,
} from 'apps/Trade/validators/setFillStatusValidator';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setFillStatusListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        trade: {orders},
      } = store.getState();

      await setFillStatusValidator.validate(params);
      const {fillStatus, orderId} = params;

      const order = validateOrderExists(orderId, orders);
      validateBlockSenderIsOrderHost(blockSender, order.host);
      validateChangeInFillStatus(order.fillStatus, fillStatus);
      validateFillStatusTransition(order.fillStatus, fillStatus);
      await validateFill(order, fillStatus);

      dispatch(setFillStatus({fillStatus, orderId}));
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setFillStatusListener;
