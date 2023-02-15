import {setPaymentStatus} from 'apps/Shop/store/orders';
import {validateBlockSenderIsBuyer, validateOrderExists, validatePayment} from 'apps/Shop/validators/common';
import {
  setPaymentStatusValidator,
  validateChangeInPaymentStatus,
  validatePaymentStatusTransition,
} from 'apps/Shop/validators/setPaymentStatusValidators';
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
        shop: {orders},
      } = store.getState();

      await setPaymentStatusValidator.validate(params);
      const {orderId, paymentStatus} = params;

      const order = validateOrderExists(orderId, orders);
      validateBlockSenderIsBuyer(blockSender, order.buyer);
      validateChangeInPaymentStatus(order.paymentStatus, paymentStatus);
      validatePaymentStatusTransition(order.paymentStatus, paymentStatus);
      await validatePayment(order, paymentStatus);

      dispatch(setPaymentStatus({orderId, paymentStatus}));

      // TODO: fix this
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setPaymentStatusListener;
