import {setOrderError} from 'apps/Trade/store/orderErrors';
import {validateOrderExists} from 'apps/Trade/validators/common';
import {
  setOrderErrorValidator,
  validateCreator,
  validateErrorIdIsUnique,
} from 'apps/Trade/validators/setOrderErrorValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setOrderErrorListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        system: {self},
        trade,
      } = store.getState();
      const orderErrors = trade.orderErrors;
      const orders = trade.orders;

      await setOrderErrorValidator.validate(params);
      const {creator, orderErrorId, orderId} = params;

      const order = validateOrderExists(orderId, orders);
      validateCreator(blockSender, creator, order, self);
      validateErrorIdIsUnique(orderErrorId, orderErrors);

      dispatch(setOrderError(params));
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setOrderErrorListener;
