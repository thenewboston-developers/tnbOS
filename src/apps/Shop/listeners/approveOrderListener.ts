import {approveOrder} from 'apps/Shop/store/orders';
import {handleOrderPayment} from 'apps/Shop/utils/orderProcessing';
import {
  approveOrderValidator,
  validateOrderIsPending,
  validatePaymentExpirationDate,
  validateReceivingAddressIsUnique,
} from 'apps/Shop/validators/approveOrderValidators';
import {validateBlockSenderIsSeller, validateOrderExists} from 'apps/Shop/validators/common';
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
        shop: {orders},
      } = store.getState();

      await approveOrderValidator.validate(params);
      const {orderId, receivingAddress} = params;

      const order = validateOrderExists(orderId, orders);
      validateBlockSenderIsSeller(blockSender, order.seller);
      validateOrderIsPending(order);
      validatePaymentExpirationDate(dispatch, order);
      validateReceivingAddressIsUnique(order, orders, receivingAddress);

      dispatch(approveOrder({orderId, receivingAddress}));

      // await handleOrderPayment({order, receivingAddress});
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default approveOrderListener;
