import {setPaymentStatus} from 'apps/Trade/store/orders';
import {handleOrderError} from 'apps/Trade/utils/orderErrors';
import {handleOrderFulfillment} from 'apps/Trade/utils/orderProcessing';
import {validateBlockSenderIsOrderClient, validateOrderExists, validatePayment} from 'apps/Trade/validators/common';
import {
  setPaymentStatusValidator,
  validateChangeInPaymentStatus,
  validatePaymentStatusTransition,
} from 'apps/Trade/validators/setPaymentStatusValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setPaymentStatusListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        trade: {holdingAccounts, orders},
      } = store.getState();

      await setPaymentStatusValidator.validate(params);
      const {orderId, paymentStatus} = params;

      const order = validateOrderExists(orderId, orders);

      try {
        validateBlockSenderIsOrderClient(blockSender, order.client);
        validateChangeInPaymentStatus(order.paymentStatus, paymentStatus);
        validatePaymentStatusTransition(order.paymentStatus, paymentStatus);
        await validatePayment(order, paymentStatus);

        dispatch(setPaymentStatus({orderId, paymentStatus}));
        await handleOrderFulfillment({
          holdingAccounts,
          networkId,
          order,
        });
      } catch (error) {
        console.error(error);
        handleOrderError({
          err: error,
          networkId,
          orderId: order.orderId,
          recipient: blockSender,
        });
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setPaymentStatusListener;
