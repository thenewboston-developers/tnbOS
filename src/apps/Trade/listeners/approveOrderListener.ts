import {approveOrder} from 'apps/Trade/store/orders';
import {handleOrderPayment} from 'apps/Trade/utils/orderProcessing';
import {validateOrderExists, validateReceivingAddressIsUnique} from 'apps/Trade/validators/common';
import {
  approveOrderValidator,
  validateBlockSenderIsOrderHost,
  validateOrderIsPending,
  validatePaymentExpirationDate,
} from 'apps/Trade/validators/approveOrderValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const approveOrderListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        trade: {orders},
      } = store.getState();

      await approveOrderValidator.validate(params);
      const {hostReceivingAddress, orderId} = params;

      const order = validateOrderExists(orderId, orders);
      validateBlockSenderIsOrderHost(blockSender, order);
      validateOrderIsPending(order);
      validatePaymentExpirationDate(dispatch, order);
      validateReceivingAddressIsUnique(orders, hostReceivingAddress);

      dispatch(approveOrder({hostReceivingAddress, orderId}));
      await handleOrderPayment(hostReceivingAddress, networkId, order);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default approveOrderListener;
